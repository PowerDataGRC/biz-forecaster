import { GoalsService } from './goals.service';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    findAll(planId: string): Promise<import("./goal.entity").Goal[]>;
    findOne(goalId: string): Promise<import("./goal.entity").Goal>;
}
