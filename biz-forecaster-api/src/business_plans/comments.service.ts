import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlanComment } from './business-plan-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(BusinessPlanComment)
    private commentsRepository: Repository<BusinessPlanComment>,
  ) {}

  async create(createDto: CreateCommentDto, userId: string): Promise<BusinessPlanComment> {
    const comment = this.commentsRepository.create({
      content: createDto.content,
      plan: { plan_id: createDto.plan_id },
      user: { user_id: userId },
      parent_comment: createDto.parent_comment_id ? { comment_id: createDto.parent_comment_id } : null,
    });
    return this.commentsRepository.save(comment);
  }

  findAllByPlan(planId: string): Promise<BusinessPlanComment[]> {
    return this.commentsRepository.find({
      where: { plan: { plan_id: planId } },
      relations: ['user', 'replies'],
      order: { created_at: 'ASC' },
    });
  }

  async update(id: string, updateDto: UpdateCommentDto): Promise<BusinessPlanComment> {
    const comment = await this.commentsRepository.preload({ comment_id: id, ...updateDto });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return this.commentsRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
  }
}