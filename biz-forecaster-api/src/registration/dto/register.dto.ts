import { IsString, IsNotEmpty, IsEmail, MinLength, IsLowercase, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  tenantName: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Subdomain can only contain lowercase letters, numbers, and hyphens.' })
  subdomain: string;

  @IsEmail()
  @IsNotEmpty()
  adminEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  adminPassword: string;
}