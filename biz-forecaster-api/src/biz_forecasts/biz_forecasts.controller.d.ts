import { BizForecastsService } from './biz_forecasts.service';
import { CreateBizForecastDto } from './dto/create-biz-forecast.dto';
import { UpdateBizForecastDto } from './dto/update-biz-forecast.dto';
export declare class BizForecastsController {
    private readonly bizForecastsService;
    constructor(bizForecastsService: BizForecastsService);
    create(createBizForecastDto: CreateBizForecastDto): Promise<import("./biz_forecast.entity").BizForecast>;
    findAll(): Promise<import("./biz_forecast.entity").BizForecast[]>;
    findOne(id: string): Promise<import("./biz_forecast.entity").BizForecast>;
    update(id: string, updateBizForecastDto: UpdateBizForecastDto): Promise<import("./biz_forecast.entity").BizForecast>;
    remove(id: string): Promise<void>;
}
