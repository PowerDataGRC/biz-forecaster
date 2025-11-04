import { User } from '../users/user.entity';
export declare enum BusinessPlanStatus {
    DRAFT = "draft",
    IN_REVIEW = "in_review",
    FINALIZED = "finalized",
    ARCHIVED = "archived"
}
export declare class BusinessPlan {
    plan_id: string;
    user: User;
    title: string;
    version: number;
    status: BusinessPlanStatus;
    language: string;
    finalized_at: Date | null;
    created_at: Date;
    updated_at: Date;
    current_assets: number | null;
    current_liabilities: number | null;
    total_debt: number | null;
    total_equity: number | null;
    ebitda: number | null;
    interest_expense: number | null;
    operating_cash_flow: number | null;
    net_profit: number | null;
    total_revenue: number | null;
}
