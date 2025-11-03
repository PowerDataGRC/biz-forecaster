import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityCogs } from './activity-cogs.entity';
import { ActivitySalesProjection } from './activity-sales-projection.entity';

@Entity('activity_products')
export class ActivityProduct {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @ManyToOne(() => Activity, (activity) => activity.products)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  category: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  price: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  cost: number;

  @Column({ nullable: true })
  unit: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ActivitySalesProjection, (projection) => projection.product)
  sales_projections: ActivitySalesProjection[];

  @OneToMany(() => ActivityCogs, (cogs) => cogs.product)
  cogs: ActivityCogs[];
}