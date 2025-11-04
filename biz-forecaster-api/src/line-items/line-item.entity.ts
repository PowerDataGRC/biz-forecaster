import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Activity } from '../activities/activity.entity';
 
export enum LineItemType {
  PRODUCT = 'product', // Represents revenue
  COGS = 'cogs', // Cost of Goods Sold
  OPERATIONAL_EXPENSE = 'operational_expense',
  CAPITAL_EXPENSE = 'capital_expense',
  STARTUP_ITEM = 'startup_item',
  ASSETS = 'assets',
  LIABILITIES = 'liabilities',
  EQUITY = 'equity',
  SEASONALITY = 'seasonality',
  OTHER = 'other',
  SALES_PROJECTION = 'sales_projection',

}

@Entity('line_items')
export class LineItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BusinessPlan)
  @JoinColumn({ name: 'business_plan_id' })
  businessPlan: BusinessPlan;

  // This is the crucial link back to a specific Activity.
  @ManyToOne(() => Activity, { nullable: true }) // nullable if a line item can exist without an activity
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: LineItemType,
  })
  type: LineItemType;

  // A flexible JSONB column to store data specific to the line item type.
  // For a PRODUCT: { price: 100, unit: 'per_item' }
  // For an EXPENSE: { cost: 500, frequency: 'monthly' }
  @Column({ type: 'jsonb', default: {} })
  details: Record<string, any>;
}