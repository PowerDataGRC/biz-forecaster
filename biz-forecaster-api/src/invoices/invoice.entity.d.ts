import { BaseEntity } from '../shared/base.entity';
import { Payment } from '../payments/payment.entity';
export declare enum InvoiceStatus {
    PAID = "paid",
    UNPAID = "unpaid",
    OVERDUE = "overdue"
}
export declare class Invoice extends BaseEntity {
    invoice_id: string;
    payments: Payment[];
    issue_date: Date;
    due_date: Date;
    amount: number;
    status: InvoiceStatus;
}
