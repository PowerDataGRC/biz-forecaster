import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateActivityDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}