import { KPIsService } from './kpis.service';
export declare class KPIsController {
    private readonly kpiService;
    constructor(kpiService: KPIsService);
    findAll(planId: string): Promise<import("./kpi.entity").Kpi[]>;
    findOne(kpiId: string): Promise<import("./kpi.entity").Kpi>;
}
