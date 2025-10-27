import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { BusinessPlansService } from './business-plans.service';
import { CreateBusinessPlanDto } from './dto/create-business-plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business-plan.dto';

@Controller('business-plans')
export class BusinessPlansController {
  constructor(private readonly businessPlansService: BusinessPlansService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBusinessPlanDto: CreateBusinessPlanDto) {
    return this.businessPlansService.create(createBusinessPlanDto);
  }

  @Get()
  findAll() {
    return this.businessPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessPlansService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateBusinessPlanDto: UpdateBusinessPlanDto) {
    return this.businessPlansService.update(id, updateBusinessPlanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.businessPlansService.remove(id);
  }
}