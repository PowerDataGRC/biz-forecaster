
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { Client } from '../client/client.entity';
import * as sampleActivities from './sample-activities.json';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async seedClientActivities(client: Client) {
    const activitiesToSave = sampleActivities.map(activityData => {
      return this.activityRepository.create({
        ...(activityData as Partial<Activity>),
        client: client,
      });
    });

    await this.activityRepository.save(activitiesToSave);
  }
}
