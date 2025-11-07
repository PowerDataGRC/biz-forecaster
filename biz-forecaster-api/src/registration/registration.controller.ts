import { Controller, Post, Get, Body, Req, Res, Query, ValidationPipe, Logger, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
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

  @Get('verify')
  async completeRegistration(
    @Query(new ValidationPipe({ transform: true })) 
    query: RegisterCompleteDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log('Registration completion request received', { 
      tokenLength: query.token?.length,
      tokenPrefix: query.token?.substring(0, 10) + '...',
      origin: req.headers?.origin,
      host: req.headers?.host
    });
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    try {
      const result = await this.registrationService.completeRegistration(query.token);
      this.logger.log('Registration completed successfully', { 
        tenantId: result.tenantId 
      });
      // On success, redirect to a frontend page with a success status
      res.redirect(`${frontendUrl}/auth/verified?status=success&tenantId=${result.tenantId}`);
    } catch (error) {
      this.logger.error('Registration completion failed', {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
        token: query.token?.substring(0, 10) + '...'
      });

      let errorCode = 'verification_failed';
      if (error.message.includes('Invalid token') || error.message.includes('Token expired')) {
        errorCode = 'invalid_token';
      }
      
      if (error.message.includes('already exists')) {
        errorCode = 'already_verified';
      }

      // On failure, redirect to the frontend with an error code
      res.redirect(`${frontendUrl}/auth/verified?status=error&code=${errorCode}`);
    }
  }
}