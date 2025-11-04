import { Repository } from 'typeorm';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { User } from '../users/user.entity';
export declare class BusinessPlanTemplatesSeederService {
    private readonly templateRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(templateRepository: Repository<BusinessPlanTemplate>, userRepository: Repository<User>);
    seed(): Promise<void>;
}
