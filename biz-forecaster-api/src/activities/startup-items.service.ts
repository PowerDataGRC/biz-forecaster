import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityStartupItem } from './activity-startup-item.entity';
import { CreateStartupItemDto } from './dto/create-startup-item.dto';

@Injectable()
export class StartupItemsService {
  constructor(
    @InjectRepository(ActivityStartupItem)
    private startupItemsRepository: Repository<ActivityStartupItem>,
  ) {}

  async create(createStartupItemDto: CreateStartupItemDto): Promise<ActivityStartupItem> {
    const item = this.startupItemsRepository.create({
      ...createStartupItemDto,
      activity: { activity_id: createStartupItemDto.activity_id },
    });
    return this.startupItemsRepository.save(item);
  }

  findAllByActivity(activityId: string): Promise<ActivityStartupItem[]> {
    return this.startupItemsRepository.find({
      where: { activity: { activity_id: activityId } },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.startupItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Startup Item with ID "${id}" not found`);
    }
  }

  // Note: Update functionality would be added here as well.
}