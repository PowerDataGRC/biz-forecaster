import { BusinessPlan } from './business-plan.entity';
import { BusinessPlanContentBlock } from './business-plan-content-block.entity';
export declare class BusinessPlanSection {
    section_id: string;
    plan: BusinessPlan;
    section_type: string;
    title: string;
    content: string;
    order_index: number;
    is_completed: boolean;
    data_sources: Record<string, any> | null;
    created_at: Date;
    updated_at: Date;
    content_blocks: BusinessPlanContentBlock[];
}
