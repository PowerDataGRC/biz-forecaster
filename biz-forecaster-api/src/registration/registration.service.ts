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
import { TenantUser } from '../users/tenant-user.entity';


@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);

  constructor(
    private readonly tenantsService: TenantsService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    try {
      await admin.auth().getUserByEmail(email);
      throw new ConflictException({
        message: 'This email address is already registered',
        code: 'EMAIL_EXISTS',
        details: {
          suggestion: 'Please try logging in instead, or use a different email address.',
          action: 'LOGIN_OR_CHANGE_EMAIL'
        }
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return { available: true };
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error('Error checking user in Firebase', { error });
      throw new InternalServerErrorException({
        message: 'Unable to check email availability',
        code: 'CHECK_FAILED',
        details: {
          suggestion: 'Please try again later or contact support if the problem persists.'
        }
      });
    }
  }

  async startRegistration(registerDto: RegisterStartDto): Promise<void> {
    const { email, password, companyName, firstName, lastName } = registerDto;

    // Check if user already exists in Firebase
    try {
      await admin.auth().getUserByEmail(email);
      this.logger.warn('Registration attempted with existing email', { email });
      throw new ConflictException({
        message: 'This email address is already registered',
        code: 'EMAIL_EXISTS',
        details: {
          suggestion: 'Please try logging in instead, or use a different email address.',
          action: 'LOGIN_OR_CHANGE_EMAIL'
        }
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // This is the expected case, continue.
      } else if (error instanceof ConflictException) {
        throw error;
      } else {
        this.logger.error('Error checking user in Firebase', {
          error: error.message,
          code: error.code,
          email
        });
        throw new InternalServerErrorException({
          message: 'Unable to process registration',
          code: 'REGISTRATION_ERROR',
          details: {
            suggestion: 'Please try again later or contact support if the problem persists.',
            errorCode: error.code
          }
        });
      }
    }

    // Generate a verification token
    const payload = { email, password, companyName, firstName, lastName };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15m', // Token expires in 15 minutes
      secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
    });

    // Send the verification email
    await this.emailService.sendRegistrationEmail(email, token);
  }

  async completeRegistration(token: string): Promise<{ message: string; tenantId: string }> {
    let payload: { email: string; password: string; companyName: string; firstName: string; lastName: string; };
    
    this.logger.log('Starting registration completion process');
    this.logger.debug(`Token received (truncated): ${token?.substring(0, 10)}...`);
    this.logger.debug('JWT secret configured:', !!this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'));

    // 1. Verify the token
    try {
      if (!token || typeof token !== 'string') {
        this.logger.error('Invalid token format received', { 
          tokenType: typeof token,
          tokenValue: token?.substring(0, 10) 
        });
        throw new BadRequestException('Invalid token format');
      }

      const secret = this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET');
      if (!secret) {
        this.logger.error('JWT_VERIFICATION_TOKEN_SECRET is not configured');
        throw new InternalServerErrorException('Server configuration error');
      }

      this.logger.debug('Attempting JWT verification', {
        tokenLength: token.length,
        tokenStart: token.substring(0, 10),
        tokenEnd: token.substring(token.length - 10),
        hasSecret: !!secret,
        secretLength: secret?.length
      });
      
      try {
        payload = this.jwtService.verify(token, { secret });
        const decodedToken = this.jwtService.decode(token) as any;
        
        this.logger.log('Token verification successful', { 
          email: payload.email,
          companyName: payload.companyName,
          payloadKeys: Object.keys(payload),
          tokenIat: decodedToken?.iat,
          tokenExp: decodedToken?.exp
        });
      } catch (jwtError) {
        this.logger.error('JWT verification failed', {
          error: jwtError.message,
          name: jwtError.name,
          tokenStart: token.substring(0, 10)
        });
        throw new BadRequestException('Invalid verification token: ' + jwtError.message);
      }
    } catch (error) {
      const errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n')[0],
      };

      if (error.name === 'JsonWebTokenError') {
        this.logger.error('JWT validation failed', {
          ...errorDetails,
          tokenInfo: {
            length: token?.length,
            format: token?.includes('.') ? 'Contains dots' : 'No dots',
            encoding: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token) ? 'Valid JWT format' : 'Invalid format'
          }
        });
        throw new BadRequestException('Invalid verification token format');
      } else if (error.name === 'TokenExpiredError') {
        this.logger.error('Token has expired', {
          ...errorDetails,
          expiryInfo: {
            current: new Date().toISOString(),
            tokenExpiry: error.expiredAt?.toISOString()
          }
        });
        throw new BadRequestException('The verification link has expired. Please request a new one.');
      } else {
        this.logger.error('Unknown token verification error', {
          ...errorDetails,
          tokenDebug: {
            length: token?.length,
            start: token?.substring(0, 10),
            end: token?.substring(token?.length - 10)
          }
        });
        throw new InternalServerErrorException('Error processing verification. Please try again or contact support.');
      }
    }

    const { email, password, companyName, firstName, lastName } = payload;

    // 2. Check if user already exists in Firebase and get their record
    let firebaseUser: admin.auth.UserRecord;
    try {
      try {
        // First try to get existing user
        firebaseUser = await admin.auth().getUserByEmail(email);
        this.logger.warn('User already exists in Firebase', { email });
        
        // If we find the user, verify if we have a corresponding tenant
        const existingTenant = await this.tenantsService.findByUserEmail(email);
        if (existingTenant) {
          // User exists in both Firebase and has a tenant - return success
          return { 
            message: 'Account already verified', 
            tenantId: existingTenant.tenant_id 
          };
        }
        
        // User exists in Firebase but no tenant - continue with tenant creation
      } catch (e) {
        if (e.code === 'auth/user-not-found') {
          // Create new Firebase user if they don't exist
          firebaseUser = await admin.auth().createUser({
            email,
            password,
            emailVerified: true,
            displayName: `${firstName} ${lastName}`,
          });
          this.logger.log('Created new Firebase user', { uid: firebaseUser.uid });
        } else {
          throw e; // Re-throw unexpected Firebase errors
        }
      }
    } catch (error) {
      this.logger.error('Firebase operation failed', { 
        code: error.code,
        message: error.message,
        email 
      });
      throw new InternalServerErrorException('Failed to process user account.');
    }

    // 3. Create the Tenant and its schema
    let tenant;
    try {
      const subdomain = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
      tenant = await this.tenantsService.create({ 
        name: companyName, 
        subdomain
      });
      this.logger.log('Created new tenant', { 
        tenantId: tenant.tenant_id,
        schema: tenant.schemaName
      });
    } catch (error) {
      this.logger.error('Failed to create tenant', { 
        error: error.message,
        companyName
      });
      // Attempt to clean up Firebase user if they were just created
      if (firebaseUser) {
        try {
          await admin.auth().deleteUser(firebaseUser.uid);
        } catch (deleteError) {
          this.logger.error('Failed to clean up Firebase user after tenant creation error', {
            uid: firebaseUser.uid,
            error: deleteError.message
          });
        }
      }
      throw new InternalServerErrorException('Failed to set up company account.');
    }

    // 4. Create the User record in the new tenant's schema
    try {
      await this.tenantsService.executeInTenant(tenant.schemaName, TenantUser, async (userRepository: Repository<TenantUser>) => {
        await userRepository.createQueryBuilder()
          .insert()
          // Pass the TenantUser class to ensure TypeORM uses the correct metadata
          .into(TenantUser)
          .values({
            user_id: firebaseUser.uid,
            first_name: firstName,
            last_name: lastName,
            email: firebaseUser.email,
            username: firebaseUser.email,
            password_hash: 'firebase-managed',
          })
          .execute();

        this.logger.log('Created user record in tenant schema', {
          email,
          schema: tenant.schemaName,
        });
      });
    } catch (error) {
      this.logger.error('Failed to create user record in tenant schema', {
        error: error.message,
        schema: tenant.schemaName,
        stack: error.stack,
      });

      // Rollback: If creating the user record fails, delete the tenant to avoid orphaned data.
      this.logger.warn(`Rolling back tenant creation for ${tenant.name} due to user creation failure.`);
      await this.tenantsService.remove(tenant.tenant_id); // Assuming remove can handle schema deletion

      // Re-throw the error so the user knows the full registration failed.
      throw new InternalServerErrorException('Failed to finalize account setup.');
    }

    return { 
      message: 'Registration successful!', 
      tenantId: tenant.tenant_id 
    };
  }

}