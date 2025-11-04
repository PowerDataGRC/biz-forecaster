import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
export declare class BusinessPlanTemplate {
    template_id: string;
    tenant: Tenant | null;
    name: string;
    description: string | null;
    category: string;
    structure: Record<string, any>;
    is_active: boolean;
    is_global: boolean;
    created_by: User;
    created_at: Date;
    updated_at: Date;
}
