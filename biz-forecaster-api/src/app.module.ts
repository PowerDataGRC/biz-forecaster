import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { BizForecastsModule } from './biz_forecasts/biz_forecasts.module';
import { User } from './users/user.entity';
import { Activity } from './activities/activity.entity';
import { AuditLog } from './audit_logs/audit_log.entity';
import { BizForecast } from './biz_forecasts/biz_forecast.entity';
import { BusinessPlansModule } from './business_plans/business-plans.module';
import { ClientsModule } from './clients/clients.module';
import { TenantsModule } from './tenants/tenants.module';
import { SeederModule } from './seeder/seeder.module';
import { BusinessPlan } from './business_plans/business-plan.entity';
import { Client } from './clients/client.entity';
import { TenantMiddleware } from './tenants/tenant.middleware';
import { TenantContextService } from './tenants/tenant-context.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, TenantsModule],
      useFactory: (
        configService: ConfigService,
        tenantContext: TenantContextService,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        schema: tenantContext.schema,
        autoLoadEntities: true, // Recommended over manually listing entities
        synchronize: false, // Important: synchronize:true is not recommended for production
      }),
      inject: [ConfigService, TenantContextService],
    }),
    UsersModule,
    ActivitiesModule,
    AuditLogsModule,
    BizForecastsModule,
    BusinessPlansModule,
    ClientsModule,
    TenantsModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService, TenantContextService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
