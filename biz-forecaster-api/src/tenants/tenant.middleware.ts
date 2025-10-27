import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from './tenants.service';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly tenantContext: TenantContextService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    const subdomain = host.split('.')[0];

    // We assume the main app runs on a domain like 'biz-forecaster.com'
    // and tenants are on 'tenant1.biz-forecaster.com'.
    // We will ignore common subdomains like 'www' or the root domain.
    if (subdomain && subdomain !== 'www' && !req.path.startsWith('/api/tenants')) {
      const tenant = await this.tenantsService.findBySubdomain(subdomain);
      if (tenant) {
        this.tenantContext.schema = tenant.subdomain;
      }
    }

    next();
  }
}