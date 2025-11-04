import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialRatiosService } from './financial-ratios.service';
import { FinancialRatiosController } from './financial-ratios.controller';
import { FinancialRatio } from './financial-ratio.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialRatio]), CommonModule],
  providers: [FinancialRatiosService],
  controllers: [FinancialRatiosController],
  exports: [FinancialRatiosService],
})
export class FinancialRatiosModule {}