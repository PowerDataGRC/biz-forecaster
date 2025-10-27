import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Invoice } from '../invoices/invoice.entity'; // Assuming this will be created

export abstract class BaseEntity {
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    BANK_TRANSFER = 'bank_transfer',
    PAYPAL = 'paypal',
}

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    payment_id!: string;

    @ManyToOne(() => Invoice, invoice => invoice.payments)
    invoice!: Invoice;

    @Column({ type: 'timestamp' })
    payment_date!: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    amount!: number;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
    })
    payment_method!: PaymentMethod;

    @Column()
    transaction_id!: string;
}
