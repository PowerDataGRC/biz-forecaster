import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpdateBizForecastDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  data?: Record<string, unknown>;
}