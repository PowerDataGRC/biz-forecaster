import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegisterStartDto {
  @IsString()
  @IsNotEmpty({ message: 'Company name must not be empty.' })
  companyName: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}