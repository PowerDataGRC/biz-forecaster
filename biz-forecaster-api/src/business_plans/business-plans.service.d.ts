import { Repository, EntityManager } from 'typeorm';
import { BusinessPlan } from './business-plan.entity';
import { CreateBusinessPlanDto } from './dto/create-business-plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business-plan.dto';
import { Activity } from '../activities/activity.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
export declare class BusinessPlansService {
    private readonly businessPlanRepository;
    private readonly activityRepository;
    private readonly tenantRepository;
    private readonly userRepository;
    private readonly templateRepository;
    private readonly entityManager;
    constructor(businessPlanRepository: Repository<BusinessPlan>, activityRepository: Repository<Activity>, tenantRepository: Repository<Tenant>, userRepository: Repository<User>, templateRepository: Repository<BusinessPlanTemplate>, entityManager: EntityManager);
    create(createBusinessPlanDto: CreateBusinessPlanDto): Promise<BusinessPlan>;
    findAll(): Promise<BusinessPlan[]>;
    findOne(id: string): Promise<BusinessPlan>;
    update(id: string, updateBusinessPlanDto: UpdateBusinessPlanDto): Promise<BusinessPlan>;
    remove(id: string): Promise<void>;
}
