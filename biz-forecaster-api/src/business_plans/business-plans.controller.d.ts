import { BusinessPlansService } from './business-plans.service';
import { CreateBusinessPlanDto } from './dto/create-business-plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business-plan.dto';
export declare class BusinessPlansController {
    private readonly businessPlansService;
    constructor(businessPlansService: BusinessPlansService);
    create(createBusinessPlanDto: CreateBusinessPlanDto): Promise<import("./business-plan.entity").BusinessPlan>;
    findAll(): Promise<import("./business-plan.entity").BusinessPlan[]>;
    findOne(id: string): Promise<import("./business-plan.entity").BusinessPlan>;
    update(id: string, updateBusinessPlanDto: UpdateBusinessPlanDto): Promise<import("./business-plan.entity").BusinessPlan>;
    remove(id: string): Promise<void>;
}
