import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from './tenant.entity'; // Corrected import path
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto'; // Assuming this DTO exists in the same folder

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly dataSource: DataSource, // Inject DataSource for raw queries
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let { subdomain, name } = createTenantDto;

    // Generate subdomain if not provided by the client
    if (!subdomain) {
      const namePrefix = name
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase()
        .substring(0, 3);
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      subdomain = `org-${namePrefix}-${randomSuffix}`;
      createTenantDto.subdomain = subdomain; // Assign the generated subdomain back to the DTO
    }

    // Ensure subdomain is unique
    const existingTenant = await this.tenantRepository.findOneBy({ subdomain });
    if (existingTenant) {
      throw new ConflictException(`Tenant with subdomain "${subdomain}" already exists.`);
    }

    const newTenant = this.tenantRepository.create(createTenantDto);
    const savedTenant = await this.tenantRepository.save(newTenant);

    // After successfully creating the tenant record, create its dedicated schema and tables.
    await this.createTenantSchema(savedTenant.subdomain);

    return savedTenant;
  }

  async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { subdomain } });
  }

  /**
   * Creates a new schema for a tenant and populates it with the necessary tables.
   * @param schemaName - The name of the schema to create (typically the tenant's subdomain).
   */
  private async createTenantSchema(schemaName: string): Promise<void> {
    // Sanitize schemaName to prevent SQL injection. It should be a valid subdomain.
    if (!/^[a-zA-Z0-9-]+$/.test(schemaName)) {
      throw new Error(`Invalid schema name: ${schemaName}`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // The full SQL script to set up a new tenant's schema and tables.
    // This script should be kept up-to-date with your application's entities.
    const setupSql = `
      CREATE SCHEMA IF NOT EXISTS "${schemaName}";
      SET search_path TO "${schemaName}";

      -- ENUM Types
      CREATE TYPE "users_role_enum" AS ENUM('admin', 'manager', 'user');
      CREATE TYPE "users_status_enum" AS ENUM('active', 'inactive', 'suspended');
      CREATE TYPE "locations_status_enum" AS ENUM('active', 'inactive');
      CREATE TYPE "clients_status_enum" AS ENUM('active', 'archived');
      CREATE TYPE "activities_status_enum" AS ENUM('draft', 'in_progress', 'completed');
      CREATE TYPE "business_plans_status_enum" AS ENUM('draft', 'in_review', 'finalized', 'archived');

      -- Table Creation (Simplified for brevity, use the full script from previous output)
      -- You would paste the full CREATE TABLE and ALTER TABLE statements here.
      -- For example:
      CREATE TABLE "locations" ( "location_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "locations_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_locations_name" UNIQUE ("name"), CONSTRAINT "PK_locations_location_id" PRIMARY KEY ("location_id") );
      CREATE TABLE "users" ( "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location_id" uuid, "username" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "role" "users_role_enum" NOT NULL DEFAULT 'user', "status" "users_status_enum" NOT NULL DEFAULT 'active', "last_login" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_users_username" UNIQUE ("username"), CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_user_id" PRIMARY KEY ("user_id") );
      CREATE TABLE "clients" ( "client_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "name" character varying NOT NULL, "business_type" character varying, "description" text, "status" "clients_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_clients_client_id" PRIMARY KEY ("client_id") );
      CREATE TABLE "activities" ( "activity_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" uuid, "name" character varying NOT NULL, "description" text, "status" "activities_status_enum" NOT NULL DEFAULT 'draft', "start_date" date, "target_completion_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_activities_activity_id" PRIMARY KEY ("activity_id") );
      CREATE TABLE "business_plan_templates" ( "template_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "category" character varying, "structure" jsonb, "is_active" boolean NOT NULL DEFAULT true, "is_global" boolean NOT NULL DEFAULT false, "created_by_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bpt_template_id" PRIMARY KEY ("template_id") );
      CREATE TABLE "business_plans" ( "plan_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "activity_id" uuid, "user_id" uuid, "title" character varying NOT NULL, "version" integer NOT NULL DEFAULT 1, "status" "business_plans_status_enum" NOT NULL DEFAULT 'draft', "template_id" uuid, "finalized_at" TIMESTAMP, "language" character varying NOT NULL DEFAULT 'en', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bp_plan_id" PRIMARY KEY ("plan_id") );
      CREATE TABLE "business_plan_sections" ( "section_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_id" uuid, "section_type" character varying NOT NULL, "title" character varying NOT NULL, "content" text, "order_index" integer, "is_completed" boolean NOT NULL DEFAULT false, "data_sources" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bps_section_id" PRIMARY KEY ("section_id") );
      CREATE TABLE "reports" ( "report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "business_plan_id" uuid, "user_id" uuid, "title" character varying NOT NULL, "report_type" character varying NOT NULL, "data" jsonb, "generated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_reports_report_id" PRIMARY KEY ("report_id") );
      CREATE TABLE "audit_logs" ( "audit_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "action" character varying NOT NULL, "entity_type" character varying, "entity_id" character varying, "old_values" jsonb, "new_values" jsonb, "ip_address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_audit_logs_audit_id" PRIMARY KEY ("audit_id") );

      -- Foreign Key Constraints
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_location_id" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE NO ACTION;
      ALTER TABLE "clients" ADD CONSTRAINT "FK_clients_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "activities" ADD CONSTRAINT "FK_activities_client_id" FOREIGN KEY ("client_id") REFERENCES "clients"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "business_plan_templates" ADD CONSTRAINT "FK_bpt_created_by_id" FOREIGN KEY ("created_by_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "business_plans" ADD CONSTRAINT "FK_bp_activity_id" FOREIGN KEY ("activity_id") REFERENCES "activities"("activity_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "business_plans" ADD CONSTRAINT "FK_bp_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "business_plans" ADD CONSTRAINT "FK_bp_template_id" FOREIGN KEY ("template_id") REFERENCES "business_plan_templates"("template_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "business_plan_sections" ADD CONSTRAINT "FK_bps_plan_id" FOREIGN KEY ("plan_id") REFERENCES "business_plans"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "reports" ADD CONSTRAINT "FK_reports_business_plan_id" FOREIGN KEY ("business_plan_id") REFERENCES "business_plans"("plan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "reports" ADD CONSTRAINT "FK_reports_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_audit_logs_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

      -- Performance Indexes
      CREATE INDEX "IDX_users_location_id" ON "users" ("location_id");
      CREATE INDEX "IDX_clients_user_id" ON "clients" ("user_id");
      CREATE INDEX "IDX_activities_client_id" ON "activities" ("client_id");
      CREATE INDEX "IDX_bps_plan_id" ON "business_plan_sections" ("plan_id");
    `;

    try {
      await queryRunner.startTransaction();
      await queryRunner.query(setupSql);
      await queryRunner.commitTransaction();
      this.logger.log(`Schema "${schemaName}" and tables created successfully.`);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Failed to create schema for tenant ${schemaName}: ${err.message}`);
      throw new Error(`Failed to create schema for tenant ${schemaName}: ${err.message}`);
    } finally {
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