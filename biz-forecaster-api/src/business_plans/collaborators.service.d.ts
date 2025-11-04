import { Repository } from 'typeorm';
import { BusinessPlanCollaborator } from './business-plan-collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { User } from '../users/user.entity';
export declare class CollaboratorsService {
    private collaboratorsRepository;
    private usersRepository;
    constructor(collaboratorsRepository: Repository<BusinessPlanCollaborator>, usersRepository: Repository<User>);
    create(planId: string, createDto: CreateCollaboratorDto, invitedById: string): Promise<BusinessPlanCollaborator>;
    findAllByPlan(planId: string): Promise<BusinessPlanCollaborator[]>;
    remove(id: string): Promise<void>;
}
