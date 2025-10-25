import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateActivityDto {
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  description?: string;
}