import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancialRatiosService {
  calculateCurrentRatio(
    currentAssets: number,
    currentLiabilities: number,
  ): number | null {
    if (currentLiabilities === 0) {
      return null;
    }
    return currentAssets / currentLiabilities;
  }

  calculateDebtToEquityRatio(
    totalDebt: number,
    totalEquity: number,
  ): number | null {
    if (totalEquity === 0) {
      return null;
    }
    return totalDebt / totalEquity;
  }

  calculateInterestCoverageRatio(
    ebitda: number,
    interestExpense: number,
  ): number | null {
    if (interestExpense === 0) {
      return null;
    }
    return ebitda / interestExpense;
  }

  calculateNetProfitMargin(
    netProfit: number,
    totalRevenue: number,
  ): number | null {
    if (totalRevenue === 0) {
      return null;
    }
    return (netProfit / totalRevenue) * 100;
  }

  calculateOperatingCashFlowRatio(
    operatingCashFlow: number,
    currentLiabilities: number,
  ): number | null {
    if (currentLiabilities === 0) {
      return null;
    }
    return operatingCashFlow / currentLiabilities;
  }
}
