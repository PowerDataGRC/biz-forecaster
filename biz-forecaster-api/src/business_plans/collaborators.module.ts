import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { BusinessPlanCollaborator } from './business-plan-collaborator.entity';
import { User } from '../users/user.entity';
import { CommonModule } from '../common/common.module';
import { BusinessPlansModule } from './business-plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessPlanCollaborator, User]), CommonModule, forwardRef(() => BusinessPlansModule)],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}
