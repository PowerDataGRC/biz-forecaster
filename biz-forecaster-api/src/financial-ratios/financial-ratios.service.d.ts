export declare class FinancialRatiosService {
    calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number | null;
    calculateDebtToEquityRatio(totalDebt: number, totalEquity: number): number | null;
    calculateInterestCoverageRatio(ebitda: number, interestExpense: number): number | null;
    calculateNetProfitMargin(netProfit: number, totalRevenue: number): number | null;
    calculateOperatingCashFlowRatio(operatingCashFlow: number, currentLiabilities: number): number | null;
}
