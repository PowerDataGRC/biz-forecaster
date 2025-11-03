import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { User } from '../users/user.entity';
import { TenantsModule } from '../tenants/tenants.module'; // Already correctly imported
import { FirebaseModule } from '../firebase/firebase.module'; // Import the FirebaseModule

@Module({
  imports: [TypeOrmModule.forFeature([Client, User]), TenantsModule, FirebaseModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
