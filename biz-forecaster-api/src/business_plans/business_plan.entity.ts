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
import { User } from '../users/user.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { BusinessPlanSection } from './business-plan-section.entity';
import { Report } from '../reports/report.entity';
import { Kpi } from '../kpis/kpi.entity';
import { Goal } from '../goals/goal.entity';
import { Document } from 'src/documents/document.entity';


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

  @OneToMany(() => Report, (report) => report.business_plan)
  reports!: Report[];

  @OneToMany(() => Kpi, (kpi) => kpi.business_plan)
  kpis: Kpi[];

  @OneToMany(() => Goal, (goal) => goal.business_plan)
  goals: Goal[];

  @OneToMany(() => Document, (document) => document.business_plan)
  documents: Document[];

}
