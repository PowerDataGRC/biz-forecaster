import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';

export class PlanningActivity {
  activity!: string;
  description!: string;
  weight!: number;
  progress!: number;
}

export class ProductAndService {
  description!: string;
  price!: number;
  sales_volume!: number;
  sales_volume_unit!: string;
}

export class CapitalExpense {
  item!: string;
  amount!: number;
}

export class OperatingExpense {
  item!: string;
  amount!: number;
  frequency!: string;
}

export class Seasonality {
    month!: string;
    factor!: number;
}

export class SalesProjection {
    year!: number;
    revenue!: number;
}

export class CurrentAssets {
    cash!: number;
    accounts_receivable!: number;
    inventory!: number;
}

export class TotalLiabilities {
    accounts_payable!: number;
    short_term_debt!: number;
    long_term_debt!: number;
}


@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  activity_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  @Column({ type: 'jsonb', nullable: true })
  planning_activities: PlanningActivity[] | null = null;

  @Column({ type: 'jsonb', nullable: true })
  products_and_services: ProductAndService[] | null = null;

  @Column({ type: 'jsonb', nullable: true })
  capital_expenses: CapitalExpense[] | null = null;

  @Column({ type: 'jsonb', nullable: true })
  operating_expenses: OperatingExpense[] | null = null;

  @Column({ type: 'decimal', nullable: true })
  cost_of_goods_sold: number | null = null;

  @Column({ type: 'jsonb', nullable: true })
  seasonality: Seasonality[] | null = null;

  @Column({ type: 'jsonb', nullable: true })
  sales_projections: SalesProjection[] | null = null;

  @Column({ type: 'jsonb', nullable: true })
  current_assets: CurrentAssets | null = null;

  @Column({ type: 'jsonb', nullable: true })
  total_liabilities: TotalLiabilities | null = null;

  @Column({ type: 'decimal', nullable: true })
  total_debt: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  total_equity: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  ebitda: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  interest_expense: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  operating_cash_flow: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  net_profit: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  total_revenue: number | null = null;

  @Column({ type: 'decimal', nullable: true })
  retained_earnings: number | null = null;
}
