export declare enum TenantStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    INACTIVE = "inactive"
}
export declare class Tenant {
    tenant_id: string;
    name: string;
    subdomain: string;
    schemaName: string;
    status: TenantStatus;
    settings: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}
