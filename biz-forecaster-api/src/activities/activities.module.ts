import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './activity.entity';

@Module({
  imports: [
    // Register all entities that live inside a tenant's schema here.
    // This makes TypeORM aware of them when a request for a specific tenant comes in.
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService], // Export the service to resolve circular dependencies
})
export class ActivitiesModule {}
