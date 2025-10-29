import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlan } from '../business_plans/business-plan.entity';

@Injectable()
export class FinancialRatiosService {
  constructor(
    @InjectRepository(BusinessPlan)
    private readonly businessPlanRepository: Repository<BusinessPlan>,
  ) {}

  async calculateCurrentRatio(planId: string): Promise<number | null> {
    const businessPlan = await this.businessPlanRepository.findOne({ where: { plan_id: planId } });

    if (!businessPlan || !businessPlan.current_assets || !businessPlan.current_liabilities) {
      return null;
    }

    return businessPlan.current_assets / businessPlan.current_liabilities;
  }

  async calculateDebtToEquityRatio(planId: string): Promise<number | null> {
    const businessPlan = await this.businessPlanRepository.findOne({ where: { plan_id: planId } });

    if (!businessPlan || !businessPlan.total_debt || !businessPlan.total_equity) {
      return null;
    }

    return businessPlan.total_debt / businessPlan.total_equity;
  }

  async calculateInterestCoverageRatio(planId: string): Promise<number | null> {
    const businessPlan = await this.businessPlanRepository.findOne({ where: { plan_id: planId } });

    if (!businessPlan || !businessPlan.ebitda || !businessPlan.interest_expense) {
      return null;
    }

    return businessPlan.ebitda / businessPlan.interest_expense;
  }

  async calculateOperatingCashFlowRatio(planId: string): Promise<number | null> {
    const businessPlan = await this.businessPlanRepository.findOne({ where: { plan_id: planId } });

    if (!businessPlan || !businessPlan.operating_cash_flow || !businessPlan.current_liabilities) {
      return null;
    }

    return businessPlan.operating_cash_flow / businessPlan.current_liabilities;
  }

  async calculateNetProfitMargin(planId: string): Promise<number | null> {
    const businessPlan = await this.businessPlanRepository.findOne({ where: { plan_id: planId } });

    if (!businessPlan || !businessPlan.net_profit || !businessPlan.total_revenue) {
      return null;
    }

    return (businessPlan.net_profit / businessPlan.total_revenue) * 100;
  }
}
