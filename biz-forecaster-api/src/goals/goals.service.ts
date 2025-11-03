import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './goal.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
  ) {}

  /**
   * Finds all goals for a specific user, ordered by most recent.
   * Note: The Goal entity is related to a BusinessPlan, not directly to a User.
   * This method finds Goals for a given business plan.
   * @param planId - The ID of the business plan.
   */
  findAllForBusinessPlan(planId: string): Promise<Goal[]> {
    return this.goalsRepository.find({
      where: { business_plan: { plan_id: planId } },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(goalId: string): Promise<Goal> {
    const goal = await this.goalsRepository.findOneBy({ goal_id: goalId });
    if (!goal) {
      throw new NotFoundException(`Goal with ID "${goalId}" not found.`);
    }
    return goal;
  }
}
