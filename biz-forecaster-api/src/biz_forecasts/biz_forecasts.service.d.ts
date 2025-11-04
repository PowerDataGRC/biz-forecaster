import { Repository } from 'typeorm';
import { BizForecast } from './biz_forecast.entity';
import { CreateBizForecastDto } from './dto/create-biz-forecast.dto';
import { UpdateBizForecastDto } from './dto/update-biz-forecast.dto';
import { User } from '../users/user.entity';
export declare class BizForecastsService {
    private readonly bizForecastRepository;
    private readonly userRepository;
    constructor(bizForecastRepository: Repository<BizForecast>, userRepository: Repository<User>);
    create(createBizForecastDto: CreateBizForecastDto): Promise<BizForecast>;
    findAll(): Promise<BizForecast[]>;
    findOne(id: string): Promise<BizForecast>;
    update(id: string, updateBizForecastDto: UpdateBizForecastDto): Promise<BizForecast>;
    remove(id: string): Promise<void>;
}
