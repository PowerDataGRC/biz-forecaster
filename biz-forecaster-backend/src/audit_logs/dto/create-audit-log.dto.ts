import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAuditLogDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  entity_name: string;

  @IsUUID()
  @IsNotEmpty()
  entity_id: string;
}