import { Controller, Post, Body, Req, ValidationPipe, Logger, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { RegistrationService } from './registration.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { RegisterCompleteDto } from './dto/register-complete.dto';

@Controller('registration')
export class RegistrationController {
  private readonly logger = new Logger(RegistrationController.name);
  
  constructor(private readonly registrationService: RegistrationService) {}

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

  // This endpoint now expects a POST request with a JSON body: { "token": "..." }
  @Post('complete')
  async completeRegistration(
    @Body(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })) 
    completeDto: RegisterCompleteDto,
    @Req() req: Request
  ): Promise<{ message: string; tenantId: string }> {
    this.logger.log('Registration completion request received', { 
      tokenLength: completeDto.token?.length,
      tokenPrefix: completeDto.token?.substring(0, 10) + '...',
      origin: req.headers?.origin,
      host: req.headers?.host
    });
    
    try {
      const result = await this.registrationService.completeRegistration(completeDto.token);
      this.logger.log('Registration completed successfully', { 
        tenantId: result.tenantId 
      });
      return result;
    } catch (error) {
      this.logger.error('Registration completion failed', {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
        token: completeDto.token?.substring(0, 10) + '...'
      });

      if (error.message.includes('Invalid token') || error.message.includes('Token expired')) {
        throw new BadRequestException('Invalid or expired verification token. Please try registering again.');
      }
      
      if (error.message.includes('already exists')) {
        throw new ConflictException('This account has already been registered.');
      }

      throw new BadRequestException(error.message || 'Verification failed. Please try again.');
    }
  }
}