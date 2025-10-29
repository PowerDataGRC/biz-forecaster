import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from '../firebase/firebase.module';
import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly usersService: UsersService,
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: admin.app.App,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ tenant: Tenant; user: User }> {
    // 1. Create the Tenant in our database
    const tenant = await this.tenantsService.create({
      name: registerDto.tenantName,
      subdomain: registerDto.subdomain,
    });

    // 2. Create the user in Firebase Authentication
    const firebaseUser = await this.firebaseAdmin.auth().createUser({
      email: registerDto.adminEmail,
      password: registerDto.adminPassword,
      displayName: registerDto.adminEmail,
    });

    // 3. Create the user in our own database, linking them to the new tenant
    const user = await this.usersService.createFromRegistration({
      email: firebaseUser.email,
      firebaseUid: firebaseUser.uid,
      tenantId: tenant.id,
    });

    return { tenant, user };
  }
}