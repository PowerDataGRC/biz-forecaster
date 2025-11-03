import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  /**
   * Placeholder for sending a registration email.
   * In a real application, this would use a service like SendGrid, Mailgun, or Nodemailer.
   * @param to The recipient's email address.
   * @param verificationLink The link the user needs to click to verify their email.
   */
  async sendRegistrationEmail(to: string, verificationLink: string): Promise<void> {
    this.logger.log(`Sending registration verification email to: ${to}`);
    try {
      await this.mailerService.sendMail({
        to: to,
        subject: 'Welcome to BizForecaster! Please Verify Your Email',
        template: './registration', // This points to registration.hbs
        context: {
          verificationLink: verificationLink,
        },
      });
      this.logger.log(`Successfully sent registration email to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send registration email to ${to}`, error.stack);
      // Re-throw a specific NestJS exception. This will be caught by the global
      // exception filter and sent to the client as a 500 error with a user-friendly message.
      throw new InternalServerErrorException(
        'Could not send verification email. Please try signing up again in a few moments.',
      );
    }
  }

}