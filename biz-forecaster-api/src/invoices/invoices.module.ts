import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), PaymentsModule],
  providers: [], // We will add InvoiceService here later
  controllers: [], // We will add InvoiceController here later
})
export class InvoicesModule {}