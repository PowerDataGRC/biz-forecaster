import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [], // We will add SubscriptionService here later
  controllers: [], // We will add SubscriptionController here later
})
export class SubscriptionsModule {}