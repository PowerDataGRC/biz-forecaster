import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FinancialRatio } from './financial-ratio.entity';

@Entity({ schema: 'public', name: 'ratio_categories' })
export class RatioCategory {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => FinancialRatio, financialRatio => financialRatio.category)
  financial_ratios: FinancialRatio[];
}
