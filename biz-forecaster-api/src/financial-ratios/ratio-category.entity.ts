import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { FinancialRatio } from './financial-ratio.entity';

export enum RatioCategories {
    PROFITABILIT_RATIOS = 'profitability_ratios',
    LIQUIDITY_RATIOS = 'liquidity ratios',
    SOLVENCY_RATIOS = 'solvency ratios',
    EFFICIENCY_RATIOS = 'efficiency ratios',
    VALUATION_RATIOS = 'valuation ratios',
    GROWTH_RATIOS = 'growth ratios',
}

@Entity('ratio_categories' )

export class RatioCategory extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => FinancialRatio, financialRatio => financialRatio.category)
  financial_ratios: FinancialRatio[];

      @Column({
          type: 'enum',
          enum: RatioCategories,
          default: RatioCategories.PROFITABILIT_RATIOS,
      })
     categories: RatioCategories;
}
