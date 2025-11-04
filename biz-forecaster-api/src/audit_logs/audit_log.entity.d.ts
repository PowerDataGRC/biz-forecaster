import { User } from '../users/user.entity';
export declare class AuditLog {
    audit_id: string;
    user: User;
    action: string;
    entity_type: string;
    entity_id: string;
    old_values: Record<string, any> | null;
    new_values: Record<string, any> | null;
    ip_address: string | null;
    created_at: Date;
}
