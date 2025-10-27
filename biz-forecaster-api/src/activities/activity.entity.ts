import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Tenant } from '../tenants/tenant.entity';
import { ActivityStartupItem } from './activity-startup-item.entity';
import { ActivityCapitalExpense } from './activity-capital-expense.entity';
import { ActivityOperationalExpense } from './activity-operational-expense.entity';
import { ActivityProduct } from './activity-product.entity';
import { ActivityCogs } from './activity-cogs.entity';
import { ActivitySalesProjection } from './activity-sales-projection.entity';
import { ActivityBalanceSheet } from './activity-balance-sheet.entity';
import { ActivityFinancialData } from './activity-financial-data.entity';

export enum ActivityStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  activity_id!: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column({ type: 'enum', enum: ActivityStatus, default: ActivityStatus.DRAFT })
  status!: ActivityStatus;

  @Column({ type: 'date', nullable: true })
  start_date!: string | null;

  @Column({ type: 'date', nullable: true })
  target_completion_date!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ActivityStartupItem, (item) => item.activity)
  startup_items!: ActivityStartupItem[];

  @OneToMany(() => ActivityCapitalExpense, (expense) => expense.activity)
  capital_expenses!: ActivityCapitalExpense[];

  @OneToMany(() => ActivityOperationalExpense, (expense) => expense.activity)
  operational_expenses!: ActivityOperationalExpense[];

  @OneToMany(() => ActivityProduct, (product) => product.activity)
  products!: ActivityProduct[];

  @OneToMany(() => ActivityCogs, (cogs) => cogs.activity)
  cogs!: ActivityCogs[];

  @OneToMany(() => ActivitySalesProjection, (projection) => projection.activity)
  sales_projections!: ActivitySalesProjection[];

  @OneToMany(() => ActivityBalanceSheet, (sheet) => sheet.activity)
  balance_sheets!: ActivityBalanceSheet[];

  @OneToMany(() => ActivityFinancialData, (data) => data.activity)
  financial_data!: ActivityFinancialData[];
}