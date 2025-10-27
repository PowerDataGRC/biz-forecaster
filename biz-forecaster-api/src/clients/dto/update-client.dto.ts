import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ClientStatus } from '../client.entity';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  business_type?: string;

  @IsEnum(ClientStatus)
  @IsOptional()
  status?: ClientStatus;
}