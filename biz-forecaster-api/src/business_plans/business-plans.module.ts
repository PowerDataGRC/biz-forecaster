import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPlansService } from './business-plans.service';
import { BusinessPlansController } from './business-plans.controller';
import { BusinessPlan } from './business-plan.entity';
import { BusinessPlanSection } from './business-plan-section.entity';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { Activity } from '../activities/activity.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
import { CollaboratorsModule } from './collaborators.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Add all entities whose repositories are injected into BusinessPlansService
      BusinessPlan,
      BusinessPlanSection,
      BusinessPlanTemplate,
      Activity,
      Tenant,
      User,
    ]),
    forwardRef(() => CollaboratorsModule),
  ],
  controllers: [BusinessPlansController],
  providers: [BusinessPlansService],
  exports: [BusinessPlansService],
})
export class BusinessPlansModule {}