import { IsString, IsNotEmpty, IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateStartupItemDto {
  @IsUUID()
  @IsNotEmpty()
  activity_id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;
}