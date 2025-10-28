import { IsString, IsNotEmpty, IsUUID, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateCapitalExpenseDto {
  @IsUUID()
  @IsNotEmpty()
  activity_id: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;
}