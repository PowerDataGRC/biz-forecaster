import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Invoice } from '../invoices/invoice.entity';

export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    PAST_DUE = 'past_due',
}

@Entity('subscriptions')
export class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    subscription_id: string;

    @OneToOne(() => Tenant, tenant => tenant.subscription)
    tenant: Tenant;

    @OneToMany(() => Invoice, invoice => invoice.subscription)
    invoices: Invoice[];

    @Column()
    plan_name: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus,
        default: SubscriptionStatus.ACTIVE,
    })
    status: SubscriptionStatus;
}
