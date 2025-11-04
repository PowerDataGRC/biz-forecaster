import { BaseEntity } from 'typeorm';
import { FinancialRatio } from './financial-ratio.entity';
export declare enum RatioCategories {
    PROFITABILIT_RATIOS = "profitability_ratios",
    LIQUIDITY_RATIOS = "liquidity ratios",
    SOLVENCY_RATIOS = "solvency ratios",
    EFFICIENCY_RATIOS = "efficiency ratios",
    VALUATION_RATIOS = "valuation ratios",
    GROWTH_RATIOS = "growth ratios"
}
export declare class RatioCategory extends BaseEntity {
    category_id: string;
    description: string;
    name: string;
    financial_ratios: FinancialRatio[];
    categories: RatioCategories;
}
