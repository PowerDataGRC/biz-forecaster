import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateAuditLogDto {
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  action?: string;

  @IsString()
  @IsOptional()
  entity_name?: string;

  @IsUUID()
  @IsOptional()
  entity_id?: string;
}