
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../activities/activity.entity';
import { Client } from '../clients/client.entity';
import * as sampleActivities from './sample-activities.json';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async seedClientActivities(client: Client) {
    // The JSON is an array with one object, which contains the 'planning-activities' array.
    const planningActivitiesData = sampleActivities[0]['planning-activities'];

    const activitiesToSave = planningActivitiesData.map(activityData => {
      // Manually map the properties from the JSON to the Activity entity.
      return this.activityRepository.create({
        name: activityData.activity, // 'activity' from JSON maps to 'name' in the entity
        description: activityData.description,
        client: client,
        // You can add other default properties here if needed, e.g., status
      });
    });

    await this.activityRepository.save(activitiesToSave);
  }
}
