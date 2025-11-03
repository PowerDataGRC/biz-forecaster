import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';

export enum ExpenseFrequency {
  ONE_TIME = 'one_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

@Entity('activity_operational_expenses')
export class ActivityOperationalExpense {
  @PrimaryGeneratedColumn('uuid')
  expense_id: string;

  @ManyToOne(() => Activity, (activity) => activity.operational_expenses)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'enum', enum: ExpenseFrequency, nullable: true })
  frequency: ExpenseFrequency;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;
}