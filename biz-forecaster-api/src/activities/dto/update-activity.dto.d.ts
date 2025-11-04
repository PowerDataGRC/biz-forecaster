import { ActivityStatus } from '../activity.entity';
export declare class UpdateActivityDto {
    client_id?: string;
    name?: string;
    description?: string;
    status?: ActivityStatus;
    start_date?: string;
    target_completion_date?: string;
}
