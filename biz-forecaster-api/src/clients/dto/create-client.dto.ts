import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsUUID()
  user_id!: string;

  @IsUUID()
  tenant_id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  business_type?: string;
}