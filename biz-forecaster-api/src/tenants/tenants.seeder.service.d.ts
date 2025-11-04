import { Repository } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
export declare class TenantsSeederService {
    private readonly tenantRepository;
    private readonly logger;
    constructor(tenantRepository: Repository<Tenant>);
    seed(): Promise<Tenant>;
}
