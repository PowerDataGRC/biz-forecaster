
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Activity } from '../activities/activity.entity';
import { LineItem, LineItemType } from '../Line-items/line-item.entity';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity'; // <-- Add the correct import for the User entity
import * as sampleActivities from './sample-activities.json';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(BusinessPlan)
    private readonly businessPlanRepository: Repository<BusinessPlan>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(LineItem)
    private readonly lineItemRepository: Repository<LineItem>,
  ) {}

  async seedClientActivities(client: Client, user: User) {
    // 1. Create a default Business Plan for the client
    const businessPlan = this.businessPlanRepository.create({
      title: `${client.name}'s Default Business Plan`, // The property is 'title', not 'name'
      user: user, // The entity requires a 'user'
    });
    await this.businessPlanRepository.save(businessPlan);

    // 2. Seed the planning activities from the JSON file
    const planningActivitiesData = sampleActivities[0]['planning-activities'];
    for (const activityData of planningActivitiesData) {
      const activity = this.activityRepository.create({
        name: activityData.activity, // 'activity' from JSON maps to 'name' in the entity
        description: activityData.description,
        businessPlan: businessPlan, // Link to the newly created business plan
      });
      await this.activityRepository.save(activity);

      // 3. (Optional but recommended) Seed related line items for this activity
      // Example for operating expenses
      if (activityData.activity === 'Develop Business Plan') {
        const operatingExpenses = sampleActivities[0]['operating-expenses'];
        const lineItems = operatingExpenses.map(exp => this.lineItemRepository.create({
          name: exp.item,
          type: LineItemType.OPERATIONAL_EXPENSE,
          details: { amount: exp.amount, frequency: exp.frequency },
          businessPlan: businessPlan,
          activity: activity, // Link the line item directly to the activity
        }));
        await this.lineItemRepository.save(lineItems);
      }
    }
  }
}
