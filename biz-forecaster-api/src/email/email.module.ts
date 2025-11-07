import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isDevelopment = process.env.NODE_ENV !== 'production';
        const templateDir = isDevelopment 
          ? join(process.cwd(), 'src/email/templates')
          : join(process.cwd(), 'dist/email/templates');
          
        return {
          transport: {
            host: configService.get<string>('SMTP_HOST'),
            port: configService.get<number>('SMTP_PORT'),
            secure: configService.get<number>('SMTP_PORT') === 465,
            auth: {
              user: configService.get<string>('SMTP_USER'),
              pass: configService.get<string>('SMTP_PASS'),
            },
            debug: isDevelopment,
            logger: isDevelopment,
          },
          defaults: {
            from: `"BizForecaster" <${configService.get<string>('SMTP_FROM')}>`,
          },
          template: {
            dir: templateDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // Export the service to make it available to other modules
})
export class EmailModule {}
