import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from './tenants.service';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly tenantContext: TenantContextService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    const subdomain = host.split('.')[0];

    // --- DEBUG LINE ---
    console.log(`[TenantMiddleware] Request received for host: "${host}", path: "${req.originalUrl}"`);

    // We assume the main app runs on a domain like 'biz-forecaster.com'
    // and tenants are on 'tenant1.biz-forecaster.com'.
    // We will ignore common subdomains like 'www' or the root domain,
    // and also bypass for registration-related paths, which may be prefixed with /api by the proxy.
    const path = req.originalUrl;
    const isRegistrationPath = path.startsWith('/registration') || path.startsWith('/api/registration');

    const shouldBypassTenantLookup =
      !subdomain ||
      subdomain === 'www' ||
      isRegistrationPath;

    if (!shouldBypassTenantLookup) {
      const tenant = await this.tenantsService.findBySubdomain(subdomain);
      if (tenant) {
        this.tenantContext.schema = tenant.subdomain;
      }
    }

    next();
  }
}