import { Repository } from 'typeorm';
import { Kpi } from './kpi.entity';
export declare class KPIsService {
    private kpisRepository;
    constructor(kpisRepository: Repository<Kpi>);
    findAllForBusinessPlan(planId: string): Promise<Kpi[]>;
    findOne(kpiId: string): Promise<Kpi>;
}
