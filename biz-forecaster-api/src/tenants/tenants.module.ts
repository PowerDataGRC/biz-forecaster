import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantContextService } from './tenant-context.service';
import { SchemaFactoryService } from './schema-factory.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
  ],
  // Provide both TenantsService and TenantContextService
  providers: [TenantsService, TenantContextService, SchemaFactoryService],
  controllers: [TenantsController],
  // Export both services so other modules can use them
  exports: [TenantsService, TenantContextService, SchemaFactoryService],
})
export class TenantsModule {}