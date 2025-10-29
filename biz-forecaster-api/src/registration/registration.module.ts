import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { TenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [TenantsModule, UsersModule, FirebaseModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}