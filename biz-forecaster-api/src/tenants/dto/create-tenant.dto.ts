import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subdomain: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  locations: string[];
}