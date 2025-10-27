import { IsString, IsUUID, IsObject, IsNotEmpty } from 'class-validator';

export class CreateBizForecastDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsObject()
  data!: Record<string, unknown>;
}