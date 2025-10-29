import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterDto } from './dto/register.dto';

@Controller('register')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.registrationService.register(registerDto);
  }
}