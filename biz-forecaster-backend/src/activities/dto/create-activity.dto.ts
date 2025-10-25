import { IsUUID, IsOptional, IsArray, IsNumber, IsObject } from 'class-validator';

interface PlanningActivity {
  activity: string;
  description: string;
  weight: number;
  progress: number;
}

interface ProductAndService {
  description: string;
  price: number;
  sales_volume: number;
  sales_volume_unit: string;
}

interface CapitalExpense {
  item: string;
  amount: number;
}

interface OperatingExpense {
  item: string;
  amount: number;
  frequency: string;
}

interface Seasonality {
    month: string;
    factor: number;
}

interface SalesProjection {
    year: number;
    revenue: number;
}

interface CurrentAssets {
    cash: number;
    accounts_receivable: number;
    inventory: number;
}

interface TotalLiabilities {
    accounts_payable: number;
    short_term_debt: number;
    long_term_debt: number;
}

export class CreateActivityDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  @IsOptional()
  client_id?: string;

  @IsArray()
  @IsOptional()
  planning_activities?: PlanningActivity[];

  @IsArray()
  @IsOptional()
  products_and_services?: ProductAndService[];

  @IsArray()
  @IsOptional()
  capital_expenses?: CapitalExpense[];

  @IsArray()
  @IsOptional()
  operating_expenses?: OperatingExpense[];

  @IsNumber()
  @IsOptional()
  cost_of_goods_sold?: number;

  @IsArray()
  @IsOptional()
  seasonality?: Seasonality[];

  @IsArray()
  @IsOptional()
  sales_projections?: SalesProjection[];

  @IsObject()
  @IsOptional()
  current_assets?: CurrentAssets;

  @IsObject()
  @IsOptional()
  total_liabilities?: TotalLiabilities;

  @IsNumber()
  @IsOptional()
  total_debt?: number;

  @IsNumber()
  @IsOptional()
  total_equity?: number;

  @IsNumber()
  @IsOptional()
  ebitda?: number;

  @IsNumber()
  @IsOptional()
  interest_expense?: number;

  @IsNumber()
  @IsOptional()
  operating_cash_flow?: number;

  @IsNumber()
  @IsOptional()
  net_profit?: number;

  @IsNumber()
  @IsOptional()
  total_revenue?: number;

  @IsNumber()
  @IsOptional()
  retained_earnings?: number;
}
