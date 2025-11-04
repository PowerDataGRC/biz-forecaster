import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { User } from '../users/user.entity';
export declare class Report extends BaseEntity {
    report_id: string;
    business_plan: BusinessPlan;
    generated_by: User;
    name: string;
    start_date: Date;
    end_date: Date;
    data: Record<string, unknown>;
}
