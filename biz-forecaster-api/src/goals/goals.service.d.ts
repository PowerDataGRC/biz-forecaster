import { Repository } from 'typeorm';
import { Goal } from './goal.entity';
export declare class GoalsService {
    private goalsRepository;
    constructor(goalsRepository: Repository<Goal>);
    findAllForBusinessPlan(planId: string): Promise<Goal[]>;
    findOne(goalId: string): Promise<Goal>;
}
