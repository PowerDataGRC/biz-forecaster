import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class RegisterStartDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  locations: string[];
}