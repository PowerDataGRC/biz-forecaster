import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from 'src/users/user.entity';
import { Tenant } from 'src/tenants/tenant.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeederService {
  private readonly logger = new Logger(UsersSeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed(defaultTenant: Tenant) {
    this.logger.log('Seeding default admin user...');

    const adminEmail = 'admin@bizforecaster.com';

    const existingAdmin = await this.userRepository.findOneBy({
      email: adminEmail,
    });

    if (existingAdmin) {
      this.logger.log('Default admin user already exists.');
      return;
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash('AdminPassword123!', salt);

    const newAdmin = this.userRepository.create({
      tenant: defaultTenant,
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
    this.logger.log('Email: admin@bizforecaster.com');
    this.logger.log('Password: AdminPassword123!');
  }
}