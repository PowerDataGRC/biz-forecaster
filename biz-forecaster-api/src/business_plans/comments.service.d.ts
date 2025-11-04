import { Repository } from 'typeorm';
import { BusinessPlanComment } from './business-plan-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsService {
    private commentsRepository;
    constructor(commentsRepository: Repository<BusinessPlanComment>);
    create(createDto: CreateCommentDto, userId: string): Promise<BusinessPlanComment>;
    findAllByPlan(planId: string): Promise<BusinessPlanComment[]>;
    update(id: string, updateDto: UpdateCommentDto): Promise<BusinessPlanComment>;
    remove(id: string): Promise<void>;
}
