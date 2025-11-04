import { Controller, UseGuards, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GoalsService } from './goals.service';

@Controller('business-plans/:planId/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  /**
   * GET /api/business-plans/:planId/goals
   * Retrieves all goals for a specific business plan.
   */
  @Get()
  findAll(@Param('planId', ParseUUIDPipe) planId: string) {
    return this.goalsService.findAllForBusinessPlan(planId);
  }

  /**
   * GET /api/business-plans/:planId/goals/:goalId
   * Retrieves a single goal by its ID.
   */
  @Get(':goalId')
  findOne(@Param('goalId', ParseUUIDPipe) goalId: string) {
    return this.goalsService.findOne(goalId);
  }
}
