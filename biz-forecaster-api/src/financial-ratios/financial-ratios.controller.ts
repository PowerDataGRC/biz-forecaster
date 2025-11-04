import { Controller, Get, Param } from '@nestjs/common';
import { FinancialRatiosService } from './financial-ratios.service';

@Controller('financial-ratios')
export class FinancialRatiosController {
  constructor(private readonly financialRatiosService: FinancialRatiosService) {}
  // The logic for calculating and exposing financial ratios should now live
  // in the BusinessPlans module, since the controller needs access to the
  // BusinessPlansService to fetch the plan first.
  //
  // Example of how this would be used in BusinessPlansController:
  //
  // @Get(':planId/ratios/current-ratio')
  // async getCurrentRatio(@Param('planId') planId: string) {
  //   // 1. Use BusinessPlansService to fetch the plan
  //   const businessPlan = await this.businessPlansService.findOne(planId);
  //
  //   // 2. Call the FinancialRatiosService with the specific data
  //   const ratio = this.financialRatiosService.calculateCurrentRatio(
  //     businessPlan.current_assets,
  //     businessPlan.current_liabilities
  //   );
  //
  //   // 3. Return the result
  //   return { currentRatio: ratio };
  // }
}
