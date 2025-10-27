import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../activities/activity.entity';

@Injectable()
export class FinancialRatiosService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async calculateCurrentRatio(activityId: string): Promise<number> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: activityId } });

    if (!activity || !activity.current_assets || !activity.current_liabilities) {
      return null;
    }

    return activity.current_assets / activity.current_liabilities;
  }

  async calculateDebtToEquityRatio(activityId: string): Promise<number> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: activityId } });

    if (!activity || !activity.total_debt || !activity.total_equity) {
      return null;
    }

    return activity.total_debt / activity.total_equity;
  }

  async calculateInterestCoverageRatio(activityId: string): Promise<number> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: activityId } });

    if (!activity || !activity.ebitda || !activity.interest_expense) {
      return null;
    }

    return activity.ebitda / activity.interest_expense;
  }

  async calculateOperatingCashFlowRatio(activityId: string): Promise<number> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: activityId } });

    if (!activity || !activity.operating_cash_flow || !activity.current_liabilities) {
      return null;
    }

    return activity.operating_cash_flow / activity.current_liabilities;
  }

  async calculateNetProfitMargin(activityId: string): Promise<number> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: activityId } });

    if (!activity || !activity.net_profit || !activity.total_revenue) {
      return null;
    }

    return (activity.net_profit / activity.total_revenue) * 100;
  }
}
