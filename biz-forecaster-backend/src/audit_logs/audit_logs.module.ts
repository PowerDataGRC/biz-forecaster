import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogsService } from './audit_logs.service';
import { AuditLogsController } from './audit_logs.controller';
import { AuditLog } from './audit_log.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog, User])],
  controllers: [AuditLogsController],
  providers: [AuditLogsService],
})
export class AuditLogsModule {}
