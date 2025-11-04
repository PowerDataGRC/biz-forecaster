import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendRegistrationEmail(email: string, token: string): Promise<void>;
}
