import { BaseEntity } from '../shared/base.entity';
import { Tenant } from '../tenants/tenant.entity';
export declare class Setting extends BaseEntity {
    setting_id: string;
    tenant: Tenant;
    key: string;
    value: string;
}
