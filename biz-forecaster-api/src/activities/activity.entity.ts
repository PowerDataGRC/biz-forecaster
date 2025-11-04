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
import { BusinessPlan } from '../business_plans/business-plan.entity';

export enum ActivityStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  activity_id!: string;

  @ManyToOne(() => BusinessPlan)
  @JoinColumn({ name: 'business_plan_id' })
  businessPlan!: BusinessPlan;

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
}