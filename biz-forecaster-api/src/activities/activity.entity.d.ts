import { BusinessPlan } from '../business_plans/business-plan.entity';
export declare enum ActivityStatus {
    DRAFT = "draft",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Activity {
    activity_id: string;
    businessPlan: BusinessPlan;
    name: string;
    description: string | null;
    status: ActivityStatus;
    start_date: string | null;
    target_completion_date: string | null;
    created_at: Date;
    updated_at: Date;
}
