import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityCogs } from './activity-cogs.entity';
import { ActivitySalesProjection } from './activity-sales-projection.entity';

@Entity('activity_products')
export class ActivityProduct {
  @PrimaryGeneratedColumn('uuid')
  product_id!: string;

  @ManyToOne(() => Activity, (activity) => activity.products)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  sku!: string | null;

  @Column({ nullable: true })
  category!: string | null;

  @Column('decimal', { precision: 15, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  cost!: number;

  @Column({ default: 'unit' })
  unit!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ActivityCogs, (cogs) => cogs.product)
  cogs!: ActivityCogs[];

  @OneToMany(() => ActivitySalesProjection, (projection) => projection.product)
  sales_projections!: ActivitySalesProjection[];
}