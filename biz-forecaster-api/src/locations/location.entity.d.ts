import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
export declare enum LocationStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class Location {
    location_id: string;
    tenant: Tenant;
    name: string;
    address: string | null;
    status: LocationStatus;
    created_at: Date;
    updated_at: Date;
    users: User[];
}
