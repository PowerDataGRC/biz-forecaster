import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityOperationalExpense } from './activity-operational-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityOperationalExpense])],
})
export class ActivityOperationalExpensesModule {}