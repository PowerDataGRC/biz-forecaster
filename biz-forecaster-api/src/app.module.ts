import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { BusinessPlansModule } from './business_plans/business-plans.module';
import { ActivitiesModule } from './activities/activities.module';
import { CollaboratorsModule } from './business_plans/collaborators.module';
import { UsersModule } from './users/users.module';
import { KPIsModule } from './kpis/kpis.module';
import { FinancialRatiosModule } from './financial-ratios/financial-ratios.module';
import { ReportsModule } from './reports/reports.module';
import { GoalsModule } from './goals/goals.module';
import { TaggablesModule } from './taggables/taggables.module';



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
          // The main DataSource needs to be aware of ALL entities to provide metadata,
          // even for tenant-specific tables. Using a glob pattern is the most robust way
          // to ensure all entities are discovered automatically.
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
    forwardRef(() => ActivitiesModule), // Use forwardRef to break circular dependencies
    forwardRef(() => BusinessPlansModule), // Use forwardRef to break circular dependencies
    CollaboratorsModule,
    ClientsModule,
    FinancialRatiosModule,
    NotificationsModule,
    UsersModule,
    KPIsModule,
	  ReportsModule,
    GoalsModule,
    TaggablesModule, // Add the new module
  ],
  controllers: [AppController], // TenantContextService is now provided by TenantsModule
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
