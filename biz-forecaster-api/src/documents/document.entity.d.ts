import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
export declare class Document extends BaseEntity {
    document_id: string;
    business_plan: BusinessPlan;
    name: string;
    file_path: string;
    file_type: string;
}
