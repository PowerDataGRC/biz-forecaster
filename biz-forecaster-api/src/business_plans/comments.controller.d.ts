import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DecodedIdToken } from 'firebase-admin/auth';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createDto: CreateCommentDto, user: DecodedIdToken): Promise<import("./business-plan-comment.entity").BusinessPlanComment>;
    findAll(planId: string): Promise<import("./business-plan-comment.entity").BusinessPlanComment[]>;
}
