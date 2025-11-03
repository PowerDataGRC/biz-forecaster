import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { CommonModule } from '@/common/common.module';
import { BusinessPlansModule } from '@/business_plans/business-plans.module';


@Module({
  imports: [TypeOrmModule.forFeature([Notification]), CommonModule, forwardRef(() => BusinessPlansModule)],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
