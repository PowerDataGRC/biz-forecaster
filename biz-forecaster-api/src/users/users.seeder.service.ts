import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from 'src/users/user.entity';
import { Tenant } from 'src/tenants/tenant.entity';
import { FirebaseService } from 'src/firebase/firebase.service'; // Import FirebaseService
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeederService {
  private readonly logger = new Logger(UsersSeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService, // Inject ConfigService
    private readonly firebaseService: FirebaseService, // Inject FirebaseService
  ) {}

  async seed(defaultTenant: Tenant) {
    this.logger.log('Seeding default admin user...');

    // Read credentials from environment variables
    const adminEmail = this.configService.get<string>('DEFAULT_ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD');

    if (!adminEmail || !adminPassword) {
      this.logger.error('DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set in environment. Skipping admin user seed.');
      return;
    }

    const existingAdmin = await this.userRepository.findOneBy({
      email: adminEmail,
    });

    if (existingAdmin) {
      this.logger.log('Default admin user already exists.');
      return;
    }

    // Create user in Firebase Auth first
    let firebaseUser;
    try {
      firebaseUser = await this.firebaseService.admin.auth().getUserByEmail(adminEmail);
      this.logger.log('Admin user already exists in Firebase Authentication.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        this.logger.log('Creating admin user in Firebase Authentication...');
        firebaseUser = await this.firebaseService.admin.auth().createUser({
          email: adminEmail,
          password: adminPassword,
          emailVerified: true,
          displayName: 'Admin User',
        });
        this.logger.log(`Firebase user created with UID: ${firebaseUser.uid}`);
      } else {
        throw error; // Re-throw other Firebase errors
      }
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(adminPassword, salt);

    const newAdmin = this.userRepository.create({
      tenant: defaultTenant,
      user_id: firebaseUser.uid, // Use the UID from Firebase as the primary key
      first_name: 'Admin',
      last_name: 'User',
      username: 'admin',
      email: adminEmail,
      password_hash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      is_verified: true,
    });

    await this.userRepository.save(newAdmin);
    this.logger.log('Default admin user created successfully.');
    this.logger.log(`Email: ${adminEmail}`);
    this.logger.log('Password: [Set from environment variable]');
  }
}