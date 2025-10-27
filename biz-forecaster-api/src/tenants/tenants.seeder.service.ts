import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class TenantsSeederService {
  private readonly logger = new Logger(TenantsSeederService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async seed(): Promise<Tenant> {
    this.logger.log('Seeding default tenant...');

    const defaultTenantData = {
      name: 'Default Tenant',
      subdomain: 'default',
    };

    const existingTenant = await this.tenantRepository.findOneBy({
      subdomain: defaultTenantData.subdomain,
    });

    if (existingTenant) {
      this.logger.log('Default tenant already exists.');
      return existingTenant;
    }

    const newTenant = this.tenantRepository.create(defaultTenantData);
    return this.tenantRepository.save(newTenant);
  }
}