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

@Entity('activity_balance_sheets')
export class ActivityBalanceSheet {
  @PrimaryGeneratedColumn('uuid')
  balance_sheet_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.balance_sheets)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column({ type: 'date' })
  as_of_date!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  assets_current!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  assets_fixed!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  assets_total!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  liabilities_current!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  liabilities_long_term!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  liabilities_total!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  equity_total!: number;

  @Column('text', { nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}