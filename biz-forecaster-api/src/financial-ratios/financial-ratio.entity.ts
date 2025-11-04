import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { RatioCategory } from './ratio-category.entity';
import { BusinessPlan } from '../business_plans/business-plan.entity';


@Entity('financial_ratios')
export class FinancialRatio extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  ratio_id: string;
  
  @ManyToOne(() => BusinessPlan)
  business_plan: BusinessPlan;
  
  @Column({ nullable: true })
  description: string;
  
  @Column()
  formula: string;
  
  @Column({ unique: true })
  name: string;
  
  @ManyToOne(() => RatioCategory, category => category.financial_ratios)
  @JoinColumn({ name: 'category_id' })
  category: RatioCategory;
  
}
