import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger(ActivitiesService.name);

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async findOne(activityId: string): Promise<Activity> {
    this.logger.log(`Finding activity with ID: ${activityId}`);
    try {
      const activity = await this.activityRepository.findOneBy({ activity_id: activityId });

      if (!activity) {
        this.logger.warn(`Activity with ID "${activityId}" not found.`);
        throw new NotFoundException(`Activity with ID "${activityId}" not found.`);
      }
      return activity;
    } catch (error) {
      this.logger.error(`Failed to find activity with ID "${activityId}"`, error.stack);
      // Re-throw the exception to be handled by the controller or a global exception filter.
      throw error;
    }
  }
}