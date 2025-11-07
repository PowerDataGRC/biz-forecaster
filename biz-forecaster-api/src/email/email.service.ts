import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';


@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  /**
   * Placeholder for sending a registration email.
   * In a real application, this would use a service like SendGrid, Mailgun, or Nodemailer.
   * @param user The recipient's email address.
   * @param verificationLink The link the user needs to click to verify their email.
   */

  async sendRegistrationEmail(email: string, token: string): Promise<void> {
    try {
      // 1. Validate environment variables
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const SMTP_HOST = process.env.SMTP_HOST;
      const SMTP_PORT = process.env.SMTP_PORT;
      const SMTP_USER = process.env.SMTP_USER;

      this.logger.debug('Email configuration:', {
        
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        templateDir: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist/email/templates' : 'src/email/templates')
      });

      if (!API_URL) {
        this.logger.error('FATAL: API_URL environment variable is not set in the backend .env file.');
        throw new InternalServerErrorException('Server configuration error: Missing API_URL.');
      }

      // 2. Prepare email content
      const verificationLink = `${API_URL}/registration/verify?token=${token}`;
      
      this.logger.log(`Preparing verification email for: ${email}`);
      this.logger.debug('Email details:', {
        to: email,
        tokenLength: token.length,
        tokenPreview: token.substring(0, 10) + '...' + token.substring(token.length - 10),
        verificationLink: verificationLink.replace(token, '...TOKEN...')
      });

      // 3. Send the email
      try {
        const result = await this.mailerService.sendMail({
          to: email,
          subject: 'Welcome to BizForecaster! Please Verify Your Email',
          template: 'registration',
          context: {
            verificationLink: verificationLink,
          },
        });

        this.logger.log(`Email sent successfully to ${email}`, {
          messageId: result?.messageId,
          response: result?.response
        });
      } catch (emailError) {
        this.logger.error(`Failed to send email to ${email}:`, {
          error: emailError.message,
          stack: emailError.stack,
          code: emailError.code
        });
        throw new InternalServerErrorException('Failed to send verification email');
      }
    } catch (error) {
      this.logger.error(`Error in registration email process for ${email}:`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }

  }
}