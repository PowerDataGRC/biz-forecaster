import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { User } from '../users/user.entity';
import { Location } from '../locations/location.entity';
import { Subscription } from '../subscriptions/subscription.entity';

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

@Entity({ schema: 'public', name: 'tenants' })
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  tenant_id: string;

  @Column({ unique: true })
  firebase_user_id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @Column({
    type: 'enum',
    enum: TenantStatus,
  })
  status: TenantStatus;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, unknown>;

  @OneToOne(() => Subscription, subscription => subscription.tenant)
  subscription: Subscription;

  @OneToMany(() => User, user => user.tenant)
  users: User[];

  @OneToMany(() => Location, location => location.tenant)
  locations: Location[];
}
