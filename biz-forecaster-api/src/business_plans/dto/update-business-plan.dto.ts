import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { BusinessPlanStatus } from '../business-plan.entity';

export class UpdateBusinessPlanDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(BusinessPlanStatus)
  @IsOptional()
  status?: BusinessPlanStatus;

  @IsInt()
  @IsOptional()
  version?: number;
}