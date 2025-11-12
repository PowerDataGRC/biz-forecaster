import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';


@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) { }

  /**
   * Sends a registration verification email to the user.
   * @param email The recipient's email address.
   * @param token The JWT verification token.
   */
  async sendRegistrationEmail(to: string, token: string): Promise<void> {
    try {
      // 1. Get the frontend URL from the configuration. This is the base for our verification link.
      const frontendUrl = this.configService.get<string>('FRONTEND_URL');
      if (!frontendUrl) {
        this.logger.error('FATAL: FRONTEND_URL environment variable is not set.');
        throw new InternalServerErrorException('Server configuration error: Missing FRONTEND_URL.');
      }

      // 2. Prepare email content
      // The verification link MUST point to the frontend /verify page.
      const verificationLink = `${frontendUrl}/register/verify?token=${token}`;

      this.logger.log(`Preparing verification email for: ${to}`);
      this.logger.debug('Email details:', {
        to: to,
        tokenLength: token.length,
        tokenPreview: token.substring(0, 10) + '...' + token.substring(token.length - 10),
        verificationLink: verificationLink.replace(token, '...TOKEN...')
      });

      // 3. Send the email
      try {
        const result = await this.mailerService.sendMail({
          to: to,
          subject: 'Welcome to BizForecaster! Please Verify Your Email',
          template: 'registration',
          context: {
            verificationLink: verificationLink,
          },
        });

        this.logger.log(`Email sent successfully to ${to}`, {
          messageId: result?.messageId,
          response: result?.response
        });
      } catch (emailError) {
        this.logger.error(`Failed to send email to ${to}:`, {
          error: emailError.message,
          stack: emailError.stack,
          code: emailError.code
        });
        throw new InternalServerErrorException('Failed to send verification email');
      }
    } catch (error) {
      this.logger.error(`Error in registration email process for ${to}:`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }

  }
}