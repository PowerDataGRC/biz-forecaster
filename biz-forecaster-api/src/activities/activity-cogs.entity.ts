import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityProduct } from './activity-product.entity';

@Entity('activity_cogs')
export class ActivityCogs {
  @PrimaryGeneratedColumn('uuid')
  cogs_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.cogs)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @ManyToOne(() => ActivityProduct, (product) => product.cogs, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product!: ActivityProduct | null;

  @Column()
  category!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 15, scale: 2 })
  cost_per_unit!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  total_cost!: number;

  @Column({ type: 'date' })
  period_start!: string;

  @Column({ type: 'date' })
  period_end!: string;

  @CreateDateColumn()
  created_at!: Date;
}