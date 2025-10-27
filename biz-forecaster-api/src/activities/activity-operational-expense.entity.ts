import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
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
  expense_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.operational_expenses)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column()
  category!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: ExpenseFrequency })
  frequency!: ExpenseFrequency;

  @Column({ type: 'date' })
  start_date!: string;

  @Column({ type: 'date', nullable: true })
  end_date!: string | null;

  @CreateDateColumn()
  created_at!: Date;
}