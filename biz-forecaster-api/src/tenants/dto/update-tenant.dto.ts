import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TenantStatus } from '../../tenants/tenant.entity';

export class UpdateTenantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  subdomain?: string;

  @IsEnum(TenantStatus)
  @IsOptional()
  status?: TenantStatus;
}