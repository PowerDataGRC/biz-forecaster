import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
export declare class Kpi extends BaseEntity {
    kpi_id: string;
    business_plan: BusinessPlan;
    name: string;
    description: string;
    target_value: string;
    actual_value: string;
    target_date: Date;
}
