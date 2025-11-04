import { BusinessPlan } from './business-plan.entity';
import { User } from '../users/user.entity';
export declare class BusinessPlanComment {
    comment_id: string;
    plan: BusinessPlan;
    user: User | null;
    parent_comment: BusinessPlanComment | null;
    replies: BusinessPlanComment[];
    content: string;
    is_resolved: boolean;
    created_at: Date;
    updated_at: Date;
}
