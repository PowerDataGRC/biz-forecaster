import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  is_resolved?: boolean;
}