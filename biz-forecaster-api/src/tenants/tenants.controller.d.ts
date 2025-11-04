import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(createTenantDto: CreateTenantDto): Promise<import("./tenant.entity").Tenant>;
    findAll(): Promise<import("./tenant.entity").Tenant[]>;
    findOne(id: string): Promise<import("./tenant.entity").Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<import("./tenant.entity").Tenant>;
    remove(id: string): Promise<void>;
}
