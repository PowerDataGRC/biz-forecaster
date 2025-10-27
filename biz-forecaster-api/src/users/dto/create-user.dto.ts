import { IsString, IsEmail, IsNotEmpty, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class CreateUserDto {
  @IsUUID()
  tenant_id!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string; // Will be hashed in the service

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}