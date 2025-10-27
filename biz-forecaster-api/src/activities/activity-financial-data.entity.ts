import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';

@Entity('activity_financial_data')
export class ActivityFinancialData {
  @PrimaryGeneratedColumn('uuid')
  financial_data_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.financial_data)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column()
  data_type!: string; // e.g., 'income_statement', 'cash_flow'

  @Column({ type: 'date' })
  period_start!: string;

  @Column({ type: 'date' })
  period_end!: string;

  @Column({ type: 'jsonb' })
  data!: Record<string, any>; // Flexible structure for various financial metrics

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}