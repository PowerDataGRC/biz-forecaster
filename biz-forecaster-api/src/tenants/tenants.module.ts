import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantContextService } from './tenant-context.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  // Provide both TenantsService and TenantContextService
  providers: [TenantsService, TenantContextService],
  controllers: [TenantsController],
  // Export both services so other modules can use them
  exports: [TenantsService, TenantContextService],
})
export class TenantsModule {}