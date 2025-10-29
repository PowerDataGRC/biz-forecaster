import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BizForecast } from './biz_forecast.entity';
import { CreateBizForecastDto,  } from './dto/create-biz-forecast.dto';
import { UpdateBizForecastDto } from './dto/update-biz-forecast.dto';
import { User } from '../users/user.entity';

@Injectable()
export class BizForecastsService {
  constructor(
    @InjectRepository(BizForecast)
    private readonly bizForecastRepository: Repository<BizForecast>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBizForecastDto: CreateBizForecastDto): Promise<BizForecast> {
    const user = await this.userRepository.findOne({ where: { user_id: createBizForecastDto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${createBizForecastDto.user_id}" not found`);
    }

    const bizForecast = this.bizForecastRepository.create({
      ...createBizForecastDto,
      user,
    });

    return this.bizForecastRepository.save(bizForecast);
  }

  findAll(): Promise<BizForecast[]> {
    return this.bizForecastRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<BizForecast> {
    const bizForecast = await this.bizForecastRepository.findOne({ where: { forecast_id: id }, relations: ['user'] });
    if (!bizForecast) {
      throw new NotFoundException(`BizForecast with ID "${id}" not found`);
    }
    return bizForecast;
  }

  async update(id: string, updateBizForecastDto: UpdateBizForecastDto): Promise<BizForecast> {
    const bizForecast = await this.bizForecastRepository.preload({
      forecast_id: id,
      ...updateBizForecastDto,
    });
    if (!bizForecast) {
      throw new NotFoundException(`BizForecast with ID "${id}" not found`);
    }
    return this.bizForecastRepository.save(bizForecast);
  }

  async remove(id: string): Promise<void> {
    const result = await this.bizForecastRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`BizForecast with ID "${id}" not found`);
    }
  }
}
