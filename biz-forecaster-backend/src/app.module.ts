import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Activity, AuditLog, BizForecast],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ActivitiesModule,
    AuditLogsModule,
    BizForecastsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
