import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BizForecastsService } from './biz_forecasts.service';
import { CreateBizForecastDto } from './dto/create-biz-forecast.dto';
import { UpdateBizForecastDto } from './dto/update-biz-forecast.dto';

@Controller('biz-forecasts')
export class BizForecastsController {
  constructor(private readonly bizForecastsService: BizForecastsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBizForecastDto: CreateBizForecastDto) {
    return this.bizForecastsService.create(createBizForecastDto);
  }

  @Get()
  findAll() {
    return this.bizForecastsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bizForecastsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBizForecastDto: UpdateBizForecastDto) {
    return this.bizForecastsService.update(id, updateBizForecastDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.bizForecastsService.remove(id);
  }
}
