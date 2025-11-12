import {
  Controller,
  Post,
  Body,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { RegisterCompleteDto } from './dto/register-complete.dto';


@Controller('registration')
export class RegistrationController {
  private readonly logger = new Logger(RegistrationController.name);

  constructor(private readonly registrationService: RegistrationService) { }

  @Post('check')
  async checkEmail(@Body() { email }: { email: string }) {
    return this.registrationService.checkEmailAvailability(email);
  }

  @Post('start')
  async startRegistration(@Body() registerDto: RegisterStartDto): Promise<{ message: string }> {
    try {
      await this.registrationService.startRegistration(registerDto);
      return { message: 'Verification email sent. Please check your inbox.' };
    } catch (error) {
      this.logger.error('Registration start failed', {
        error: error.message,
        email: registerDto.email,
        stack: error.stack,
      });

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to process registration. Please try again.');
    }
  }

  @Post('complete')
  async completeRegistration(@Body() completeDto: RegisterCompleteDto) {
    this.logger.log('Registration completion request received', {
      tokenLength: completeDto.token?.length,
      tokenPrefix: completeDto.token?.substring(0, 10) + '...',
    });

    try {
      return await this.registrationService.completeRegistration(
        completeDto.token,
      );
    } catch (error) {
      this.logger.error('Registration completion failed', {
        errorName: error.name,
        errorMessage: error.message,
      });
      // Re-throw the error so it's handled by NestJS's exception filters.
      throw error;
    }
  }
}