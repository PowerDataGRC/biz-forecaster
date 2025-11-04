import { BusinessPlan } from '../business_plans/business-plan.entity';
import { Activity } from '../activities/activity.entity';
export declare enum LineItemType {
    PRODUCT = "product",
    COGS = "cogs",
    OPERATIONAL_EXPENSE = "operational_expense",
    CAPITAL_EXPENSE = "capital_expense",
    STARTUP_ITEM = "startup_item",
    ASSETS = "assets",
    LIABILITIES = "liabilities",
    EQUITY = "equity",
    SEASONALITY = "seasonality",
    OTHER = "other",
    SALES_PROJECTION = "sales_projection"
}
export declare class LineItem {
    id: string;
    businessPlan: BusinessPlan;
    activity: Activity;
    name: string;
    type: LineItemType;
    details: Record<string, any>;
}
