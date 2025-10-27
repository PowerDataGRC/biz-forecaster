import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class CreateBusinessPlanDto {
  @IsUUID()
  activity_id!: string;

  @IsUUID()
  tenant_id!: string;

  @IsUUID()
  user_id!: string;

  @IsString()
  title!: string;

  @IsUUID()
  @IsOptional()
  template_id?: string;
}