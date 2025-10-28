import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalExpensesService } from './capital-expenses.service';
import { CapitalExpensesController } from './capital-expenses.controller';
import { ActivityCapitalExpense } from './activity-capital-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityCapitalExpense])],
  controllers: [CapitalExpensesController],
  providers: [CapitalExpensesService],
  exports: [CapitalExpensesService],
})
export class CapitalExpensesModule {}