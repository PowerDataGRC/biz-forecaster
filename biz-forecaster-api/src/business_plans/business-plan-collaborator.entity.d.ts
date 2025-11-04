import { BusinessPlan } from './business-plan.entity';
import { User } from '../users/user.entity';
import { PermissionLevel } from './dto/permission-level.enum';
export declare class BusinessPlanCollaborator {
    collaborator_id: string;
    plan: BusinessPlan;
    user: User;
    invited_by: User;
    permission_level: PermissionLevel;
    created_at: Date;
}
