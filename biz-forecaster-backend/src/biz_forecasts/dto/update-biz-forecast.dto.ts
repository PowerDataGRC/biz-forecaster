import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class UpdateBizForecastDto {
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  business_name?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsNumber()
  @IsOptional()
  revenue?: number;

  @IsNumber()
  @IsOptional()
  cogs?: number;

  @IsNumber()
  @IsOptional()
  opex?: number;

  @IsNumber()
  @IsOptional()
  non_operating_income?: number;

  @IsNumber()
  @IsOptional()
  interest_expense?: number;

  @IsNumber()
  @IsOptional()
  tax_rate?: number;
}
