import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RatioCategory } from './ratio-category.entity';

@Entity({ schema: 'public', name: 'financial_ratios' })
export class FinancialRatio {
  @PrimaryGeneratedColumn('uuid')
  ratio_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  formula: string;

  @ManyToOne(() => RatioCategory, category => category.financial_ratios)
  @JoinColumn({ name: 'category_id' })
  category: RatioCategory;
}
