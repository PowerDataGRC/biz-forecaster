import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './activity.entity';
import { ActivityCogs } from './activity-cogs.entity';
import { ActivitySalesProjection } from './activity-sales-projection.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    // Register all entities that live inside a tenant's schema here.
    // This makes TypeORM aware of them when a request for a specific tenant comes in.
    TypeOrmModule.forFeature([
      Activity, ActivityCogs, ActivitySalesProjection
    ]),
    CommonModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService], // Export the service to resolve circular dependencies
})
export class ActivitiesModule {}
