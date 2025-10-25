import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { SeederModule } from '../seeder/seeder.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), SeederModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
