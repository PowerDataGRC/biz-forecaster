import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { RegisterCompleteDto } from './dto/register-complete.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('start')
  @HttpCode(HttpStatus.OK)
  async startRegistration(@Body() registerStartDto: RegisterStartDto) {
    await this.registrationService.startRegistration(registerStartDto);
    return { message: 'Verification email sent. Please check your inbox.' };
  }

  @Post('complete')
  async completeRegistration(@Body() registerCompleteDto: RegisterCompleteDto) {
    const result = await this.registrationService.completeRegistration(registerCompleteDto.token);
    return result;
  }
}