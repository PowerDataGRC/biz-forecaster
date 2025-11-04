import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum TaggableType {
  GOAL = 'goal',
  KPI = 'kpi',
  REPORT = 'report',
  TASK = 'task',
  NOTIFICATION = 'notification',
  // etc.
}

export enum TargetType {
  ACTIVITY = 'activity',
  LINE_ITEM = 'line_item',
}

@Entity('taggables')
export class Taggable {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  taggableId: string;

  @Column({ type: 'enum', enum: TaggableType })
  taggableType: TaggableType;

  @Column()
  targetId: string; // The ID of the Activity or LineItem being tagged

  @Column({ type: 'enum', enum: TargetType })
  targetType: TargetType; // Specifies whether targetId refers to an Activity or a LineItem
}