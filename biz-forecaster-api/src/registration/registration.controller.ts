import { Controller, Post, Body, Get, Query, } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { RegisterCompleteDto } from './dto/register-complete.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('start')
  async startRegistration(@Body() registerDto: RegisterStartDto): Promise<{ message: string }> {
    await this.registrationService.startRegistration(registerDto);
    return { message: 'Verification email sent. Please check your inbox.' };
  }

  // This endpoint now expects a POST request with a JSON body: { "token": "..." }
  @Post('complete')
  async completeRegistration(@Body() completeDto: RegisterCompleteDto): Promise<{ message: string; tenantId: string }> {
    // The ValidationPipe (if applied globally) will automatically validate the DTO.
    // It ensures 'token' is a non-empty string.
    return this.registrationService.completeRegistration(completeDto.token);
  }
}