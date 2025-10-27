import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { Payment } from '../payments/payment.entity';

export enum InvoiceStatus {
    PAID = 'paid',
    UNPAID = 'unpaid',
    OVERDUE = 'overdue',
}

@Entity('invoices')
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    invoice_id: string;

    @ManyToOne(() => Subscription, subscription => subscription.invoices)
    subscription: Subscription;

    @OneToMany(() => Payment, payment => payment.invoice)
    payments: Payment[];

    @Column({ type: 'date' })
    issue_date: Date;

    @Column({ type: 'date' })
    due_date: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatus,
        default: InvoiceStatus.UNPAID,
    })
    status: InvoiceStatus;
}
