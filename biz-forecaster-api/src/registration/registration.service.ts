import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { TenantsService } from '../tenants/tenants.service';
import { RegisterStartDto } from './dto/register-start.dto';
import { EmailService } from '../email/email.service'; // We'll create this next
import { User, UserRole } from '../users/user.entity';


@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);

  constructor(
    private readonly tenantsService: TenantsService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async startRegistration(registerDto: RegisterStartDto): Promise<void> {
    const { email, password, companyName } = registerDto;

    // Check if user already exists in Firebase
    try {
      await admin.auth().getUserByEmail(email);
      throw new ConflictException('This email address is already in use by another account.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // This is the expected case, continue.
      } else if (error instanceof ConflictException) {
        throw error;
      } else {
        this.logger.error('Error checking user in Firebase', error);
        throw new InternalServerErrorException();
      }
    }

    // Generate a verification token
    const payload = { email, password, companyName };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15m', // Token expires in 15 minutes
      secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
    });

    const verificationLink = `${this.configService.get<string>('FRONTEND_URL')}/register/verify?token=${token}`;

    // Send the verification email
    await this.emailService.sendRegistrationEmail(email, verificationLink);
  }

  async completeRegistration(token: string): Promise<{ message: string; tenantId: string }> {
    let payload: { email: string; password: string; companyName: string };

    // 1. Verify the token
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      });
    } catch (error) {
      this.logger.error('Invalid or expired registration token', error);
      throw new BadRequestException('The verification link is invalid or has expired.');
    }

    const { email, password, companyName } = payload;

    // 2. Create the user in Firebase
    let firebaseUser: admin.auth.UserRecord;
    try {
      firebaseUser = await admin.auth().createUser({
        email,
        password,
        emailVerified: true, // The email is verified by this process
        displayName: companyName, // Use company name as the initial display name
      });
    } catch (error) {
      this.logger.error(`Failed to create Firebase user for ${email}`, error);
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('This email address has already been registered.');
      }
      throw new InternalServerErrorException('Failed to create user account.');
    }

    // 3. Create the Tenant and its schema
    const tenant = await this.tenantsService.create({ name: companyName, subdomain: companyName.toLowerCase().replace(/[^a-z0-9]/g, '') });

    // 4. Create the User record in the new tenant's schema
    await this.tenantsService.executeInTenant(tenant.schemaName, User, async (userRepository) => {
      const newUser = userRepository.create({
        user_id: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.email,
        password_hash: 'firebase-managed',
        role: UserRole.ADMIN, // The user creating the tenant is the admin
        tenant: tenant, // Assign the full tenant object to the relation
        location: null,
      });
      await userRepository.save(newUser);
    });

    return { message: 'Registration successful!', tenantId: tenant.tenant_id };
  }

}