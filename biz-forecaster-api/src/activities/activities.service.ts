
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { Client } from '../clients/client.entity';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // Assuming DTOs will be created
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createActivityDto: any): Promise<Activity> {
    const client = await this.clientRepository.findOne({ where: { client_id: createActivityDto.client_id } });
    if (createActivityDto.client_id) {
      if (!client) {
        throw new NotFoundException(`Client with ID "${createActivityDto.client_id}" not found`);
      }
    }

    const tenant = await this.tenantRepository.findOne({ where: { tenant_id: createActivityDto.tenant_id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${createActivityDto.tenant_id}" not found`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      client,
      tenant,
    });

    return this.activityRepository.save(activity);
  }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['client', 'tenant'] });
  }

  async findAllByClient(clientId: string): Promise<Activity[]> {
    return this.activityRepository.find({ where: { client: { client_id: clientId } }, relations: ['client', 'tenant'] });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: id }, relations: ['client', 'tenant'] });
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: any): Promise<Activity> {
    const activity = await this.findOne(id);
    const { client_id, tenant_id, ...rest } = updateActivityDto;

    if (client_id) {
      const client = await this.clientRepository.findOne({ where: { client_id } });
      if (!client) {
        throw new NotFoundException(`Client with ID "${client_id}" not found`);
      }
      // This assumes client is a property on activity.
      // Based on your entity, it seems correct.
      Object.assign(activity, { client });
    }

    Object.assign(activity, rest);
    return this.activityRepository.save(activity);
  }

  async remove(id: string): Promise<void> {
    const result = await this.activityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
  }
}
