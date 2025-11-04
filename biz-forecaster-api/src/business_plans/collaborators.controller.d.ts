import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { DecodedIdToken } from 'firebase-admin/auth';
export declare class CollaboratorsController {
    private readonly collaboratorsService;
    constructor(collaboratorsService: CollaboratorsService);
    create(planId: string, createDto: CreateCollaboratorDto, user: DecodedIdToken): Promise<import("./business-plan-collaborator.entity").BusinessPlanCollaborator>;
    findAll(planId: string): Promise<import("./business-plan-collaborator.entity").BusinessPlanCollaborator[]>;
}
