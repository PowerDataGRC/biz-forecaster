import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: configService.get<number>('SMTP_PORT') === 465, // Use true for port 465, false for others
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"${configService.get<string>('SMTP_FROM_NAME', 'BizForecaster')}" <${configService.get<string>('SMTP_FROM')}>`,
        },
        template: {
          // This now correctly points to the 'templates' sub-directory.
          dir: join(__dirname, 'templates'),
          // Explicitly providing a helpers object can resolve subtle initialization issues.
          // We pass an empty object as we don't have custom helpers.
          adapter: new HandlebarsAdapter({}),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // Export the service to make it available to other modules
})
export class EmailModule {}
