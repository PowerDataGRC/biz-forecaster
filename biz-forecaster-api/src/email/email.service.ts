import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/user.entity';


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
      // 1. Check for the FRONTEND_URL environment variable first.
      const FRONTEND_URL = process.env.FRONTEND_URL;
      if (!FRONTEND_URL) {
        // This is a configuration error, so we throw a specific error for the developer.
        this.logger.error('FATAL: FRONTEND_URL environment variable is not set.');
        throw new InternalServerErrorException('Server configuration error.');
      }

      const encodedToken = encodeURIComponent(token);
      const verificationLink = `${FRONTEND_URL}/register/verify?token=${encodedToken}`;
      this.logger.log(`Sending registration verification email to: ${email}`);
      this.logger.debug(`Generated verification link (token truncated): ${FRONTEND_URL}/register/verify?token=...${encodedToken.substring(encodedToken.length - 10)}`);

      // 2. Attempt to send the email.
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to BizForecaster! Please Verify Your Email',
        template: 'registration',
        context: {
          verificationLink: verificationLink,
        },
      });

      this.logger.log(`Successfully sent registration email to ${email}`);
    } catch (error) {
      // 3. Catch any error from the process and log it for debugging.
      this.logger.error(`Failed to send registration email to ${email}`, error.stack);

      // 4. Re-throw the original error to be caught by the global exception filter.
      throw error;
    }
  }
}