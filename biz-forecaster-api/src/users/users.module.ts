import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TenantsModule, // A simple import is now sufficient
  ],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Export UsersService and TypeOrmModule
})
export class UsersModule {}