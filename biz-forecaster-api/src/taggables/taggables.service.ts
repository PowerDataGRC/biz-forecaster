import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taggable, TaggableType } from './taggable.entity';

@Injectable()
export class TaggablesService {
  constructor(
    @InjectRepository(Taggable)
    private readonly taggablesRepository: Repository<Taggable>,
  ) {}

  async findActivitiesByTaggable(
    taggableId: string,
    taggableType: TaggableType,
  ): Promise<Taggable[]> {
    return this.taggablesRepository.find({
      where: { taggableId, taggableType },
      relations: ['activity'],
    });
  }
}