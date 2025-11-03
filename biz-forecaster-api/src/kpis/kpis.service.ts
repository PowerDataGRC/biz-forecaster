import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kpi } from './kpi.entity';

@Injectable()
export class KPIsService {
  constructor(
    @InjectRepository(Kpi)
    private kpisRepository: Repository<Kpi>,
  ) {}

  /**
   * Finds all KPIs for a specific user, ordered by most recent.
   * Note: The Kpi entity is related to a BusinessPlan, not directly to a User.
   * This method finds KPIs for a given business plan.
   * @param planId - The ID of the business plan.
   */
  findAllForBusinessPlan(planId: string): Promise<Kpi[]> {
    return this.kpisRepository.find({
      where: { business_plan: { plan_id: planId } },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(kpiId: string): Promise<Kpi> {
    const kpi = await this.kpisRepository.findOneBy({ kpi_id: kpiId });
    if (!kpi) {
      throw new NotFoundException(`KPI with ID "${kpiId}" not found.`);
    }
    return kpi;
  }
}
