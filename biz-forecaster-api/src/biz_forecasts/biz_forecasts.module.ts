import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizForecastsService } from './biz_forecasts.service';
import { BizForecastsController } from './biz_forecasts.controller';
import { BizForecast } from './biz_forecast.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BizForecast, User])],
  controllers: [BizForecastsController],
  providers: [BizForecastsService],
})
export class BizForecastsModule {}
