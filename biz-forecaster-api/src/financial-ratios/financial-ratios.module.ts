import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialRatiosController } from './financial-ratios.controller';
import { FinancialRatiosService } from './financial-ratios.service';
import { RatioCategory } from './ratio-category.entity';
import { FinancialRatio } from './financial-ratio.entity';
import { Activity } from '../activities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatioCategory, FinancialRatio, Activity])],
  controllers: [FinancialRatiosController],
  providers: [FinancialRatiosService],
})
export class FinancialRatiosModule {}
