import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BusinessPlan } from './business-plan.entity';
import { User } from '../users/user.entity';

@Entity('business_plan_comments')
export class BusinessPlanComment {
  @PrimaryGeneratedColumn('uuid')
  comment_id!: string;

  @ManyToOne(() => BusinessPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan!: BusinessPlan;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;

  @ManyToOne(() => BusinessPlanComment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_comment_id' })
  parent_comment!: BusinessPlanComment | null;

  @OneToMany(() => BusinessPlanComment, (comment) => comment.parent_comment)
  replies!: BusinessPlanComment[];

  @Column('text')
  content!: string;

  @Column({ default: false })
  is_resolved!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}