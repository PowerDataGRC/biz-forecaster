import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { PermissionLevel } from '../business-plan-collaborator.entity';

export class CreateCollaboratorDto {
  @IsUUID()
  @IsNotEmpty()
  plan_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsEnum(PermissionLevel)
  @IsNotEmpty()
  permission_level: PermissionLevel;
}