import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityProduct } from './activity-product.entity';

@Entity('activity_sales_projections')
export class ActivitySalesProjection {
  @PrimaryGeneratedColumn('uuid')
  projection_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.sales_projections)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @ManyToOne(
    () => ActivityProduct,
    (product) => product.sales_projections,
    { nullable: true },
  )
  @JoinColumn({ name: 'product_id' })
  product!: ActivityProduct | null;

  @Column({ type: 'date' })
  period_start!: string;

  @Column({ type: 'date' })
  period_end!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  projected_units!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  projected_revenue!: number;

  @Column('text', { nullable: true })
  projection_basis!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}