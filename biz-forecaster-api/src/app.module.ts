import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { PaymentsModule } from './payments/payments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RegistrationModule } from './registration/registration.module';
import { TenantMiddleware } from './tenants/tenant.middleware';
import { FirebaseModule } from './firebase/firebase.module'; // Ensure this is uncommented

// Only import entities that live in the 'public' schema for the main connection
import { Tenant } from './tenants/tenant.entity';
import { Subscription } from './subscriptions/subscription.entity';
import { ClientsModule } from './clients/clients.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BizForecastsModule } from './biz_forecasts/biz_forecasts.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { TasksModule } from './tasks/tasks.module';
import { BusinessPlansModule } from './business_plans/business-plans.module';
import { ActivitiesModule } from './activities/activities.module';
import { ActivityOperationalExpensesModule } from './activities/activity-operational-expenses.module';
import { ActivityProductsModule } from './activities/activity-products.module';
import { CapitalExpensesModule } from './activities/capital-expenses.module';
import { StartupItemsModule } from './activities/startup-items.module';
import { CollaboratorsModule } from './business_plans/collaborators.module';
import { UsersModule } from './users/users.module';
import { KPIsModule } from './kpis/kpis.module';
import { FinancialRatiosModule } from './financial-ratios/financial-ratios.module';
import { ReportsModule } from './reports/reports.module';
import { GoalsModule } from './goals/goals.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule, // Add this to ensure Firebase is initialized at startup.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        if (!dbUrl) {
          throw new Error('DATABASE_URL environment variable is not set');
        }
        return {
          type: 'postgres',
          // For serverless Postgres providers like Neon, sslmode=require is often necessary.
          // Appending it to the URL is the most reliable way to configure SSL, and we remove
          // the separate `ssl` object to avoid potential conflicts in the driver.
          url: dbUrl.includes('sslmode') ? dbUrl : `${dbUrl}?sslmode=require`,
          // The main connection MUST ONLY be aware of entities that exist exclusively
          // in the 'public' schema and have NO relations to tenant-specific tables.
          // User, Client, Location, etc., are tenant-specific and must be removed.
          // This list should only contain entities that live in the public schema.
          entities: [Tenant, Subscription],
          synchronize: false, // Crucial for a migration-first approach.
          // --- Add Logging Configuration ---
          // 'all' logs everything. For production, you might prefer ['error', 'warn'].
          // Other options: 'query', 'schema', 'migration'
          logging: 'all',
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    TenantsModule, // Provides TenantsService, which is needed globally.
    RegistrationModule,
    // Public-facing modules
    SubscriptionsModule,
    // Tenant-specific modules. Importing them here makes their entities
    // available to the dataSource for schema synchronization.
    AuditLogsModule,
    ActivitiesModule,
    ActivityOperationalExpensesModule,
    ActivityProductsModule,
    BusinessPlansModule,
    BizForecastsModule,
    CapitalExpensesModule,
    CollaboratorsModule,
    ClientsModule,
    FinancialRatiosModule,
    NotificationsModule,
    StartupItemsModule,
	  TasksModule, 
    UsersModule,
    KPIsModule,
	  ReportsModule,
    GoalsModule,

  ],
  controllers: [AppController], // TenantContextService is now provided by TenantsModule
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
