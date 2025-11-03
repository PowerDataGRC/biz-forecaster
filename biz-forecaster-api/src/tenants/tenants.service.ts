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
import { User } from '../users/user.entity'; // Keep this for type safety in executeInTenant

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
    if (!/^[a-z0-9-]+$/.test(schemaName)) {
      throw new Error(`Invalid schema name: ${schemaName}`);
    }
 
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      // Create the schema for the new tenant
      await queryRunner.createSchema(schemaName, true);
      // Run migrations or synchronize the schema
      await this.dataSource.synchronize();
      // The `uuid-ossp` extension is required for uuid_generate_v4(). We run this after schema creation.
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "${schemaName}"`);

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
}