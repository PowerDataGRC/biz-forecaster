import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Invoice } from '../invoices/invoice.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELED = 'canceled',
  TRIAL = 'trial',
}

export enum SubscriptionPlan {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // This establishes the one-to-one link.
  // The @JoinColumn indicates that this table will hold the foreign key ('tenant_id').

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.MONTHLY,
  })
  plan: SubscriptionPlan;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @Column({ name: 'next_renewal_date', type: 'timestamp with time zone' })
  nextRenewalDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

//  @OneToMany(() => Invoice, (invoice) => invoice.subscription)
//  invoices: Invoice[];
}