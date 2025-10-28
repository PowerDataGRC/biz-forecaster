import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartupItemsService } from './startup-items.service';
import { StartupItemsController } from './startup-items.controller';
import { ActivityStartupItem } from './activity-startup-item.entity';

@Module({})
@Module({
  imports: [TypeOrmModule.forFeature([ActivityStartupItem])],
  controllers: [StartupItemsController],
  providers: [StartupItemsService],
  // We export the service so that other modules, like ActivitiesModule, can use it.
  exports: [StartupItemsService],
})
export class StartupItemsModule {}