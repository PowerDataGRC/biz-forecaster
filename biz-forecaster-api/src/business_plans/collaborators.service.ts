import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlanCollaborator } from './business-plan-collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(BusinessPlanCollaborator)
    private collaboratorsRepository: Repository<BusinessPlanCollaborator>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    planId: string,
    createDto: CreateCollaboratorDto,
    invitedById: string,
  ): Promise<BusinessPlanCollaborator> {
    const userToInvite = await this.usersRepository.findOneBy({ email: createDto.email });

    if (!userToInvite) {
      throw new NotFoundException(`User with email "${createDto.email}" not found.`);
    }

    const existingCollaborator = await this.collaboratorsRepository.findOneBy({ plan: { plan_id: planId }, user: { user_id: userToInvite.user_id } });
    if (existingCollaborator) {
      throw new ConflictException(`User "${createDto.email}" is already a collaborator on this plan.`);
    }

    const collaborator = this.collaboratorsRepository.create({
      plan: { plan_id: planId },
      user: { user_id: userToInvite.user_id },
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