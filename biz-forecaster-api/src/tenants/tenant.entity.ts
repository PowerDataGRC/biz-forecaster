import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';


export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  tenant_id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  subdomain!: string;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status!: TenantStatus;

  @Column({ type: 'jsonb', nullable: true })
  settings!: Record<string, any>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users!: User[];

  @OneToOne(() => Subscription, (subscription) => subscription.tenant)
  subscription: Subscription;
}