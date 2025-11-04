import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kpi } from './kpi.entity';
import { KPIsService } from './kpis.service';
import { KPIsController } from './kpis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Kpi])],
  providers: [KPIsService],
  controllers: [KPIsController],
  exports: [KPIsService], // Export the service
})
export class KPIsModule {}
