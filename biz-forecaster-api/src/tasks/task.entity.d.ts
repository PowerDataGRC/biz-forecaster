import { BaseEntity } from '../shared/base.entity';
import { Goal } from '../goals/goal.entity';
import { User } from '../users/user.entity';
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Task extends BaseEntity {
    task_id: string;
    goal: Goal;
    assigned_to: User;
    name: string;
    description: string;
    due_date: Date;
    status: TaskStatus;
}
