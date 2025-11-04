import { BusinessPlanSection } from './business-plan-section.entity';
export declare enum BlockType {
    TEXT = "text",
    TABLE = "table",
    CHART = "chart",
    IMAGE = "image",
    FINANCIAL_TABLE = "financial_table"
}
export declare class BusinessPlanContentBlock {
    block_id: string;
    section: BusinessPlanSection;
    block_type: BlockType;
    content: Record<string, any>;
    data_binding: Record<string, any> | null;
    order_index: number;
    created_at: Date;
    updated_at: Date;
}
