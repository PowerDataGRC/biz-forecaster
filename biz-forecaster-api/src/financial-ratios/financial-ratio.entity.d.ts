import { BaseEntity } from 'typeorm';
import { RatioCategory } from './ratio-category.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
export declare class FinancialRatio extends BaseEntity {
    ratio_id: string;
    business_plan: BusinessPlan;
    description: string;
    formula: string;
    name: string;
    category: RatioCategory;
}
