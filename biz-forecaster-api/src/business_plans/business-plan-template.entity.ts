import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

@Entity('business_plan_templates')
export class BusinessPlanTemplate {
  @PrimaryGeneratedColumn('uuid')
  template_id!: string;

  @ManyToOne(() => Tenant, { nullable: true }) // Null for global templates
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant | null;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column()
  category!: string; // e.g., 'startup', 'loan', 'investor'

  @Column({ type: 'jsonb' })
  structure!: Record<string, any>; // Defines sections and their order

  @Column({ default: true })
  is_active!: boolean;

  @Column({ default: false })
  is_global!: boolean; // Available to all tenants

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}