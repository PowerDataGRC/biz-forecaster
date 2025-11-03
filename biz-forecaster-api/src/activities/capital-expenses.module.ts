import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalExpensesService } from './capital-expenses.service';
import { CapitalExpensesController } from './capital-expenses.controller';
import { ActivityCapitalExpense } from './capital-expense.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityCapitalExpense]), CommonModule],
  controllers: [CapitalExpensesController],
  providers: [CapitalExpensesService],
  exports: [CapitalExpensesService],
})
export class CapitalExpensesModule {}