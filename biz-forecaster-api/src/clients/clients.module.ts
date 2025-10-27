import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { User } from '../users/user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User, Tenant])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
