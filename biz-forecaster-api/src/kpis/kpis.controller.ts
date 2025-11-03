import { Controller, UseGuards, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { KPIsService } from './kpis.service';

@Controller('business-plans/:planId/kpis')
@UseGuards(FirebaseAuthGuard)
export class KPIsController {
  constructor(private readonly kpiService: KPIsService) {}

  /**
   * GET /api/business-plans/:planId/kpis
   * Retrieves all KPIs for a specific business plan.
   */
  @Get()
  findAll(@Param('planId', ParseUUIDPipe) planId: string) {
    return this.kpiService.findAllForBusinessPlan(planId);
  }

  /**
   * GET /api/business-plans/:planId/kpis/:kpiId
   * Retrieves a single KPI by its ID.
   */
  @Get(':kpiId')
  findOne(@Param('kpiId', ParseUUIDPipe) kpiId: string) {
    return this.kpiService.findOne(kpiId);
  }
}
