"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = EmailService_1 = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async sendRegistrationEmail(email, token) {
        try {
            const FRONTEND_URL = process.env.FRONTEND_URL;
            if (!FRONTEND_URL) {
                this.logger.error('FATAL: FRONTEND_URL environment variable is not set.');
                throw new common_1.InternalServerErrorException('Server configuration error.');
            }
            const verificationLink = `${FRONTEND_URL}/auth/verify-email?token=${token}`;
            this.logger.log(`Sending registration verification email to: ${email}`);
            await this.mailerService.sendMail({
                to: email,
                subject: 'Welcome to BizForecaster! Please Verify Your Email',
                template: 'registration',
                context: {
                    verificationLink: verificationLink,
                },
            });
            this.logger.log(`Successfully sent registration email to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send registration email to ${email}`, error.stack);
            throw new common_1.InternalServerErrorException('Could not send verification email. Please try signing up again in a few moments.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map