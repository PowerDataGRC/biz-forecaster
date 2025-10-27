import { IsString, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { ActivityStatus } from '../activity.entity';

export class UpdateActivityDto {
  @IsUUID()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  name?: string;

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
