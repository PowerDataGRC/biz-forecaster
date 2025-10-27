import { IsString, IsOptional, IsEnum, IsDateString, IsUUID, IsNotEmpty } from 'class-validator';
import { ActivityStatus } from '../activity.entity';

export class CreateActivityDto {
  @IsUUID()
  client_id!: string;

  @IsUUID()
  tenant_id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  target_completion_date?: string;
}