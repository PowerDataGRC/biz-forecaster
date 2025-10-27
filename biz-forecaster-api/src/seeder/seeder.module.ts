import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPlanTemplate } from '../business_plans/business-plan-template.entity';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';
import { BusinessPlanTemplatesSeederService } from '../business_plans/business-plan-templates.seeder.service';
import { TenantsSeederService } from '../tenants/tenants.seeder.service';
import { UsersSeederService } from '../users/users.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessPlanTemplate, User, Tenant])],
  providers: [BusinessPlanTemplatesSeederService, UsersSeederService, TenantsSeederService],
  exports: [BusinessPlanTemplatesSeederService, UsersSeederService, TenantsSeederService],
})
export class SeederModule {}