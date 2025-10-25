import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateBizForecastDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  business_name: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsNumber()
  @IsNotEmpty()
  revenue: number;

  @IsNumber()
  @IsNotEmpty()
  cogs: number;

  @IsNumber()
  @IsNotEmpty()
  opex: number;

  @IsNumber()
  @IsNotEmpty()
  non_operating_income: number;

  @IsNumber()
  @IsNotEmpty()
  interest_expense: number;

  @IsNumber()
  @IsNotEmpty()
  tax_rate: number;
}
