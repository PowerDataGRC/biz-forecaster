import { User } from '../users/user.entity';
export declare class BizForecast {
    forecast_id: string;
    title: string;
    description: string;
    data: Record<string, unknown>;
    user: User;
}
