
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Activity } from '../activities/activity.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Client])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
