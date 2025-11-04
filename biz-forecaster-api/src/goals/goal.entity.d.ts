import { BaseEntity } from '../shared/base.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Task } from '../tasks/task.entity';
export declare enum GoalStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ON_HOLD = "on_hold"
}
export declare class Goal extends BaseEntity {
    goal_id: string;
    business_plan: BusinessPlan;
    tasks: Task[];
    name: string;
    description: string;
    target_date: Date;
    status: GoalStatus;
}
