import { Invoice } from '../invoices/invoice.entity';
export declare enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    BANK_TRANSFER = "bank_transfer",
    PAYPAL = "paypal"
}
export declare enum PaymentStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    FAILED = "failed"
}
export declare class Payment {
    payment_id: string;
    invoice: Invoice;
    amount: number;
    payment_method: PaymentMethod;
    status: PaymentStatus;
    payment_date: Date;
}
