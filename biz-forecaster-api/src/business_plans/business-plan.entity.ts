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
import { Activity } from '../activities/activity.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { BusinessPlanSection } from './business-plan-section.entity';
import { Kpi } from '../kpis/kpi.entity';
import { Goal } from '../goals/goal.entity';
import { Report } from '../reports/report.entity';

export enum BusinessPlanStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  FINALIZED = 'finalized',
  ARCHIVED = 'archived',
}

@Entity('business_plans')
export class BusinessPlan {
  @PrimaryGeneratedColumn('uuid')
  plan_id!: string;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  title!: string;

  @Column('integer', { default: 1 })
  version!: number;

  @Column({
    type: 'enum',
    enum: BusinessPlanStatus,
    default: BusinessPlanStatus.DRAFT,
  })
  status!: BusinessPlanStatus;

  @ManyToOne(() => BusinessPlanTemplate, { nullable: true })
  @JoinColumn({ name: 'template_id' })
  template!: BusinessPlanTemplate | null;

  @Column({ default: 'en' })
  language!: string;

  @Column({ type: 'timestamp', nullable: true })
  finalized_at!: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => BusinessPlanSection, (section) => section.plan)
  sections!: BusinessPlanSection[];

  @OneToMany(() => Kpi, (kpi) => kpi.business_plan)
  kpis: Kpi[];

  @OneToMany(() => Goal, (goal) => goal.business_plan) // Assuming 'business_plan' property on Goal entity
  goals: Goal[];

  @OneToMany(() => Report, (report) => report.business_plan) // Corrected from 'businessplan'
  reports!: Report[];

  // Add financial properties to resolve errors in FinancialRatiosService
  @Column('decimal', { nullable: true })
  current_assets: number | null;

  @Column('decimal', { nullable: true })
  current_liabilities: number | null;

  @Column('decimal', { nullable: true })
  total_debt: number | null;

  @Column('decimal', { nullable: true })
  total_equity: number | null;

  @Column('decimal', { nullable: true })
  ebitda: number | null;

  @Column('decimal', { nullable: true })
  interest_expense: number | null;

  @Column('decimal', { nullable: true })
  operating_cash_flow: number | null;

  @Column('decimal', { nullable: true })
  net_profit: number | null;

  @Column('decimal', { nullable: true })
  total_revenue: number | null;
}