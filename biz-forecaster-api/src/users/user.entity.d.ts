import { Tenant } from '../tenants/tenant.entity';
import { Location } from '../locations/location.entity';
export declare enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    USER = "user"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class User {
    user_id: string;
    tenant: Tenant;
    location: Location | null;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password_hash: string;
    role: UserRole;
    status: UserStatus;
    last_login: Date | null;
    is_verified: boolean;
    verification_token: string | null;
    otp_secret: string | null;
    otp_recovery_codes: string[] | null;
    created_at: Date;
    updated_at: Date;
}
