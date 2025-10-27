import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BusinessPlanSection } from './business-plan-section.entity';

export enum BlockType {
  TEXT = 'text',
  TABLE = 'table',
  CHART = 'chart',
  IMAGE = 'image',
  FINANCIAL_TABLE = 'financial_table',
}

@Entity('business_plan_content_blocks')
export class BusinessPlanContentBlock {
  @PrimaryGeneratedColumn('uuid')
  block_id!: string;

  @ManyToOne(() => BusinessPlanSection, (section) => section.content_blocks)
  @JoinColumn({ name: 'section_id' })
  section!: BusinessPlanSection;

  @Column({ type: 'enum', enum: BlockType })
  block_type!: BlockType;

  @Column({ type: 'jsonb' })
  content!: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  data_binding!: Record<string, any> | null;

  @Column('integer')
  order_index!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}