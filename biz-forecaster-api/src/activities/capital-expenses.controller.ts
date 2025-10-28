import { Controller, UseGuards, Post, Body, ValidationPipe, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CapitalExpensesService } from './capital-expenses.service';
import { CreateCapitalExpenseDto } from './dto/create-capital-expense.dto';

@Controller('activities/:activityId/capital-expenses')
@UseGuards(FirebaseAuthGuard)
export class CapitalExpensesController {
  constructor(private readonly capitalExpensesService: CapitalExpensesService) {}

  @Post()
  create(@Body(ValidationPipe) createDto: CreateCapitalExpenseDto) {
    return this.capitalExpensesService.create(createDto);
  }

  @Get()
  findAll(@Param('activityId', ParseUUIDPipe) activityId: string) {
    return this.capitalExpensesService.findAllByActivity(activityId);
  }
}