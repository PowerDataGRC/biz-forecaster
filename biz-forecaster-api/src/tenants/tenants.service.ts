import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DataSourceOptions } from 'typeorm';
import { Tenant } from './tenant.entity'; // Corrected import path
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto'; // Assuming this DTO exists in the same folder
import { SchemaFactoryService } from './schema-factory.service';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly dataSource: DataSource, // Inject DataSource for raw queries
    private readonly schemaFactory: SchemaFactoryService, // Inject the new factory
  ) {}

  /**
   * Executes a database operation within the context of a specific tenant's schema.
   * It handles setting the schema path for the transaction and repository management.
   * @param schemaName The name of the tenant's schema.
   * @param operation A callback function that receives the tenant-scoped repository and performs the database work.
   * @returns The result of the callback function.
   */
  async executeInTenant<Entity, Result>(
    schemaName: string,
    entity: new () => Entity,
    operation: (repository: Repository<Entity>) => Promise<Result>,
  ): Promise<Result> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO "${schemaName}"`);
    try {
      const repository = queryRunner.manager.getRepository(entity);
      return await operation(repository);
    } finally {
      await queryRunner.query(`SET search_path TO "public"`); // Reset search path
      await queryRunner.release();
    }
  }

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const { subdomain, name } = createTenantDto;

    // Ensure subdomain is unique
    const existingTenant = await this.tenantRepository.findOneBy({ subdomain });
    if (existingTenant) {
      throw new ConflictException(`Tenant with subdomain "${subdomain}" already exists.`);
    }

    // Generate the schema name using the factory
    const schemaName = this.schemaFactory.generateSchemaName(name);

    const newTenant = this.tenantRepository.create({
      name,
      subdomain,
      schemaName, // Save the generated schema name
    });

    const savedTenant = await this.tenantRepository.save(newTenant);

    // After successfully creating the tenant record, create its dedicated schema and tables.
    await this.createTenantSchema(savedTenant.schemaName);

    return savedTenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { subdomain } });
  }

  /**
   * Creates a new schema for a tenant and populates it with the necessary tables.
   * @param schemaName - The name of the schema to create (typically the tenant's subdomain).
   */
  private async createTenantSchema(schemaName: string): Promise<void> {
    // Allow lowercase letters, numbers and underscores in schema names
    if (!/^[a-z0-9_]+$/.test(schemaName)) {
      throw new Error(`Invalid schema name: ${schemaName}`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      // Create the schema for the new tenant
      await queryRunner.createSchema(schemaName, true);

      // Ensure uuid extension is available before creating tables. Creating it in the
      // public schema is safer for most hosted Postgres providers and avoids permission issues.
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

      // Set search path to the new schema
      await queryRunner.query(`SET search_path TO "${schemaName}"`);

      // Create tables in the new schema
      await this.schemaFactory.createTenantTables(queryRunner, schemaName);

      // Reset search path to public
      await queryRunner.query(`SET search_path TO "public"`);

      this.logger.log(`Schema "${schemaName}" and tables created successfully.`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `Failed to create schema for tenant ${schemaName}: ${errorMessage}`,
      );
      // Throw a specific NestJS HTTP exception, which will be sent to the client.
      throw new InternalServerErrorException(
        'Failed to set up the organization environment. Please contact support.',
      );
    } finally {
      // Ensure the temporary connection is always closed.
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOneBy({ tenant_id: id });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${id}" not found.`);
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.tenantRepository.preload({
      tenant_id: id,
      ...updateTenantDto,
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${id}" not found.`);
    }
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tenantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tenant with ID "${id}" not found`);
    }
  }

  async findByUserEmail(email: string): Promise<Tenant | null> {
    try {
      // Query the public schema's users table to find the tenant
      const result = await this.dataSource.query(
        `SELECT t.* FROM public.tenants t 
         INNER JOIN users u ON u.tenant_id = t.tenant_id 
         WHERE u.email = $1 
         LIMIT 1`,
        [email]
      );
      
      if (result && result.length > 0) {
        return this.tenantRepository.create(result[0] as Partial<Tenant>);
      }
      return null;
    } catch (error) {
      this.logger.error('Failed to find tenant by user email', {
        error: error.message,
        email
      });
      return null;
    }
  }
}