import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTenantDto: {
    name: string;
    subdomain: string;
    firebase_user_id: string;
  }): Promise<Tenant> {
    const newTenant = this.tenantsRepository.create(createTenantDto);
    await this.tenantsRepository.save(newTenant);

    await this.entityManager.query(`CREATE SCHEMA IF NOT EXISTS "${newTenant.subdomain}"`);

    return newTenant;
  }
}
