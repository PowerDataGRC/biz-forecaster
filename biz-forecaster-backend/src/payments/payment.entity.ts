import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { Invoice } from '../invoices/invoice.entity';

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    BANK_TRANSFER = 'bank_transfer',
    PAYPAL = 'paypal',
}

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @ManyToOne(() => Invoice, invoice => invoice.payments)
    invoice: Invoice;

    @Column({ type: 'timestamp' })
    payment_date: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
    })
    payment_method: PaymentMethod;

    @Column()
    transaction_id: string;
}
