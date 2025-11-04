import { BusinessPlanStatus } from '../business-plan.entity';
export declare class UpdateBusinessPlanDto {
    title?: string;
    status?: BusinessPlanStatus;
    version?: number;
}
