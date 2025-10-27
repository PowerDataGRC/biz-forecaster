import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  audit_id!: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @ManyToOne(() => User, (user) => user.audit_logs)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  action!: string;

  @Column()
  entity_type!: string;

  @Column('uuid')
  entity_id!: string;

  @Column({ type: 'jsonb', nullable: true })
  old_values!: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  new_values!: Record<string, any> | null;

  @Column({ nullable: true })
  ip_address!: string | null;

  @CreateDateColumn()
  created_at!: Date;
}