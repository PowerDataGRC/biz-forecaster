import { IsString, IsNotEmpty, IsLowercase, Matches } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Subdomain can only contain lowercase letters, numbers, and hyphens.' })
  subdomain: string;
}