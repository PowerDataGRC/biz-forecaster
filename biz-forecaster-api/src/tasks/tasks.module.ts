import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [], // We will add SubscriptionService here later
  controllers: [], // We will add SubscriptionController here later
})
export class TasksModule {}