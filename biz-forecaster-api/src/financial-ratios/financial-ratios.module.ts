import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { FinancialRatiosService } from './financial-ratios.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessPlan])],
  providers: [FinancialRatiosService],
  exports: [FinancialRatiosService],
})
export class FinancialRatiosModule {}