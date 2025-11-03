import { IsString, IsEmail, IsNotEmpty, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class CreateUserDto {
  @IsUUID()
  @IsOptional() // Optional because it's only provided during registration
  user_id?: string;

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
  @IsOptional()
  password_hash?: string;

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