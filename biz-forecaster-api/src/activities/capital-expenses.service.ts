import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityCapitalExpense } from './activity-capital-expense.entity';
import { CreateCapitalExpenseDto } from './dto/create-capital-expense.dto';

@Injectable()
export class CapitalExpensesService {
  constructor(
    @InjectRepository(ActivityCapitalExpense)
    private capitalExpensesRepository: Repository<ActivityCapitalExpense>,
  ) {}

  async create(createDto: CreateCapitalExpenseDto): Promise<ActivityCapitalExpense> {
    const expense = this.capitalExpensesRepository.create({
      ...createDto,
      activity: { activity_id: createDto.activity_id },
    });
    return this.capitalExpensesRepository.save(expense);
  }

  findAllByActivity(activityId: string): Promise<ActivityCapitalExpense[]> {
    return this.capitalExpensesRepository.find({
      where: { activity: { activity_id: activityId } },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.capitalExpensesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Capital Expense with ID "${id}" not found`);
    }
  }
}