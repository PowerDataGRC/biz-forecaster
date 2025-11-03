import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { BusinessPlan } from './business-plan.entity';
import { User } from '../users/user.entity';
import { PermissionLevel } from './dto/permission-level.enum';

@Entity('business_plan_collaborators')
export class BusinessPlanCollaborator {
  @PrimaryGeneratedColumn('uuid')
  collaborator_id: string;

  @ManyToOne(() => BusinessPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan: BusinessPlan;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'invited_by_id' })
  invited_by: User;

  @Column({
    type: 'enum',
    enum: PermissionLevel,
  })
  permission_level: PermissionLevel;

  @CreateDateColumn()
  created_at: Date;
}