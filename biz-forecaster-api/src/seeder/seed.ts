import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { BusinessPlanTemplatesSeederService } from '../business_plans/business-plan-templates.seeder.service';
import { Logger } from '@nestjs/common';
import { TenantsSeederService } from '../tenants/tenants.seeder.service';
import { UsersSeederService } from '../users/users.seeder.service';

async function bootstrap() {
  const logger = new Logger('Seeder');
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    logger.log('--- Starting Seeding Process ---');
    const tenantSeeder = appContext.get(TenantsSeederService);
    const defaultTenant = await tenantSeeder.seed();
    const userSeeder = appContext.get(UsersSeederService);
    await userSeeder.seed(defaultTenant);
    const templateSeeder = appContext.get(BusinessPlanTemplatesSeederService);
    await templateSeeder.seed();
    logger.log('--- Seeding Process Completed Successfully ---');
  } catch (error) {
    logger.error('Seeding failed!');
    logger.error(error);
  } finally {
    await appContext.close();
    process.exit(0);
  }
}

bootstrap();