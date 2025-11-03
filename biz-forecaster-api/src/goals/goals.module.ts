import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Goal]), CommonModule],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService], // Export the service
})
export class GoalsModule {}
