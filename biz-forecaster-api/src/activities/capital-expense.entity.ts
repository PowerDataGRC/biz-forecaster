import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FINANCED = 'financed',
}

@Entity('activity_capital_expenses')
export class ActivityCapitalExpense {
  @PrimaryGeneratedColumn('uuid')
  expense_id: string;

  @ManyToOne(() => Activity, (activity) => activity.capital_expenses)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'date', nullable: true })
  expense_date: Date;

  @Column({ type: 'enum', enum: PaymentStatus, nullable: true })
  payment_status: PaymentStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
}