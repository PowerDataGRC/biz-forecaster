import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { TenantsService } from '../tenants/tenants.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { EmailService } from '../email/email.service';
import { User } from '../users/user.entity';
export declare class RegistrationService {
    private readonly tenantsService;
    private readonly jwtService;
    private readonly emailService;
    private readonly configService;
    private readonly userRepository;
    private readonly logger;
    constructor(tenantsService: TenantsService, jwtService: JwtService, emailService: EmailService, configService: ConfigService, userRepository: Repository<User>);
    startRegistration(registerDto: RegisterStartDto): Promise<void>;
    completeRegistration(token: string): Promise<{
        message: string;
        tenantId: string;
    }>;
}
