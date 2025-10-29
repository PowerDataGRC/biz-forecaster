import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { PermissionLevel } from './permission-level.enum';

export class CreateCollaboratorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(PermissionLevel)
  @IsNotEmpty()
  permission_level: PermissionLevel;
}