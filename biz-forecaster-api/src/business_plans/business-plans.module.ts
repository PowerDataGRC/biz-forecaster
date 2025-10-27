import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPlansService } from './business-plans.service';
import { BusinessPlansController } from './business-plans.controller';
import { BusinessPlan } from './business-plan.entity';
import { BusinessPlanSection } from './business-plan-section.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { Activity } from '../activities/activity.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusinessPlan,
      BusinessPlanSection,
      BusinessPlanTemplate,
      Activity,
      Tenant,
      User,
    ]),
  ],
  controllers: [BusinessPlansController],
  providers: [BusinessPlansService],
})
export class BusinessPlansModule {}