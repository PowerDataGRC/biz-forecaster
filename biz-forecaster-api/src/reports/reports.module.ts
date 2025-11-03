import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [], // We will add SubscriptionService here later
  controllers: [], // We will add SubscriptionController here later
})
export class ReportsModule {}