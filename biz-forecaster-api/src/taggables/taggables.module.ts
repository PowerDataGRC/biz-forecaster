import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taggable } from './Taggable.entity';
import { TaggablesService } from './taggables.service';
import { TaggablesController } from './taggables.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taggable])],
  providers: [TaggablesService],
  controllers: [TaggablesController],
  exports: [TaggablesService],
})
export class TaggablesModule {}