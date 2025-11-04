import { TenantStatus } from '../../tenants/tenant.entity';
export declare class UpdateTenantDto {
    name?: string;
    subdomain?: string;
    status?: TenantStatus;
}
