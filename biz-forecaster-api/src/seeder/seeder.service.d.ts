import { Repository } from 'typeorm';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Activity } from '../activities/activity.entity';
import { LineItem } from '../Line-items/line-item.entity';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
export declare class SeederService {
    private readonly businessPlanRepository;
    private readonly activityRepository;
    private readonly lineItemRepository;
    constructor(businessPlanRepository: Repository<BusinessPlan>, activityRepository: Repository<Activity>, lineItemRepository: Repository<LineItem>);
    seedClientActivities(client: Client, user: User): Promise<void>;
}
