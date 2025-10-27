import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
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
  expense_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.capital_expenses)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column()
  category!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount!: number;

  @Column({ type: 'date' })
  expense_date!: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  payment_status!: PaymentStatus;

  @Column('text', { nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  created_at!: Date;
}