import { Repository, DataSource } from 'typeorm';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SchemaFactoryService } from './schema-factory.service';
export declare class TenantsService {
    private readonly tenantRepository;
    private readonly dataSource;
    private readonly schemaFactory;
    private readonly logger;
    constructor(tenantRepository: Repository<Tenant>, dataSource: DataSource, schemaFactory: SchemaFactoryService);
    executeInTenant<Entity, Result>(schemaName: string, entity: new () => Entity, operation: (repository: Repository<Entity>) => Promise<Result>): Promise<Result>;
    create(createTenantDto: CreateTenantDto): Promise<Tenant>;
    findAll(): Promise<Tenant[]>;
    findBySubdomain(subdomain: string): Promise<Tenant | null>;
    private createTenantSchema;
    findOne(id: string): Promise<Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant>;
    remove(id: string): Promise<void>;
}
