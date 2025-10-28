import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlanCollaborator } from './business-plan-collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(BusinessPlanCollaborator)
    private collaboratorsRepository: Repository<BusinessPlanCollaborator>,
  ) {}

  async create(createDto: CreateCollaboratorDto, invitedById: string): Promise<BusinessPlanCollaborator> {
    const collaborator = this.collaboratorsRepository.create({
      plan: { plan_id: createDto.plan_id },
      user: { user_id: createDto.user_id },
      invited_by: { user_id: invitedById },
      permission_level: createDto.permission_level,
    });
    return this.collaboratorsRepository.save(collaborator);
  }

  findAllByPlan(planId: string): Promise<BusinessPlanCollaborator[]> {
    return this.collaboratorsRepository.find({
      where: { plan: { plan_id: planId } },
      relations: ['user', 'invited_by'],
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.collaboratorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Collaborator with ID "${id}" not found`);
    }
  }

  // Note: Update functionality (e.g., changing permissions) would be added here.
}