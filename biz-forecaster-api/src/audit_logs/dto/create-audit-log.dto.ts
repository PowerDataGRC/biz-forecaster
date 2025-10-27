import { IsString, IsUUID, IsObject, IsOptional } from 'class-validator';

export class CreateAuditLogDto {
  @IsUUID()
  user_id!: string;
  @IsString()
  action!: string;
  @IsString()
  entity_type!: string;
  @IsUUID()
  entity_id!: string;
}