import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class RegisterCompleteDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, {
    message: 'Invalid token format - expected JWT format',
  })
  token: string;
}
