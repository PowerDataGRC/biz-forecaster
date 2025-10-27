import { Controller, Get, Param } from '@nestjs/common';
import { FinancialRatiosService } from './financial-ratios.service';

@Controller('financial-ratios')
export class FinancialRatiosController {
  constructor(private readonly financialRatiosService: FinancialRatiosService) {}

  @Get('current-ratio/:activityId')
  async getCurrentRatio(@Param('activityId') activityId: string) {
    const currentRatio = await this.financialRatiosService.calculateCurrentRatio(activityId);
    return { currentRatio };
  }

  @Get('debt-to-equity-ratio/:activityId')
  async getDebtToEquityRatio(@Param('activityId') activityId: string) {
    const debtToEquityRatio = await this.financialRatiosService.calculateDebtToEquityRatio(activityId);
    return { debtToEquityRatio };
  }

  @Get('interest-coverage-ratio/:activityId')
  async getInterestCoverageRatio(@Param('activityId') activityId: string) {
    const interestCoverageRatio = await this.financialRatiosService.calculateInterestCoverageRatio(activityId);
    return { interestCoverageRatio };
  }

  @Get('operating-cash-flow-ratio/:activityId')
  async getOperatingCashFlowRatio(@Param('activityId') activityId: string) {
    const operatingCashFlowRatio = await this.financialRatiosService.calculateOperatingCashFlowRatio(activityId);
    return { operatingCashFlowRatio };
  }

  @Get('net-profit-margin/:activityId')
  async getNetProfitMargin(@Param('activityId') activityId: string) {
    const netProfitMargin = await this.financialRatiosService.calculateNetProfitMargin(activityId);
    return { netProfitMargin };
  }
}
