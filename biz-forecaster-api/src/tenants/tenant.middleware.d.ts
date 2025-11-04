import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from './tenants.service';
import { TenantContextService } from './tenant-context.service';
export declare class TenantMiddleware implements NestMiddleware {
    private readonly tenantsService;
    private readonly tenantContext;
    constructor(tenantsService: TenantsService, tenantContext: TenantContextService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
