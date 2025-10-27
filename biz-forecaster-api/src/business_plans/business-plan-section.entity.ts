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
import { BusinessPlan } from './business-plan.entity';
import { BusinessPlanContentBlock } from './business-plan-content-block.entity';

@Entity('business_plan_sections')
export class BusinessPlanSection {
  @PrimaryGeneratedColumn('uuid')
  section_id!: string;

  @ManyToOne(() => BusinessPlan, (plan) => plan.sections)
  @JoinColumn({ name: 'plan_id' })
  plan!: BusinessPlan;

  @Column()
  section_type!: string; // e.g., 'executive_summary', 'market_analysis'

  @Column()
  title!: string;

  @Column('text')
  content!: string; // Rich text/markdown content

  @Column('integer')
  order_index!: number;

  @Column({ default: false })
  is_completed!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  data_sources!: Record<string, any> | null; // References to activity data used

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(
    () => BusinessPlanContentBlock,
    (contentBlock) => contentBlock.section,
  )
  content_blocks!: BusinessPlanContentBlock[];
}