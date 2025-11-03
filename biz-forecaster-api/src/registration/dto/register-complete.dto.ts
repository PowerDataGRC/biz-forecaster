import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterCompleteDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
