import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';

@Entity('activity_startup_items')
export class ActivityStartupItem {
  @PrimaryGeneratedColumn('uuid')
  item_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.startup_items)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column()
  title!: string;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column({ default: false })
  is_completed!: boolean;

  @Column({ type: 'date', nullable: true })
  completion_date!: string | null;

  @Column('integer')
  order_index!: number;

  @CreateDateColumn()
  created_at!: Date;
}