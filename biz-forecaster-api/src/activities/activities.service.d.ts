import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
export declare class ActivitiesService {
    private readonly activityRepository;
    private readonly logger;
    constructor(activityRepository: Repository<Activity>);
    findOne(activityId: string): Promise<Activity>;
}
