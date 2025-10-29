
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { Client } from '../clients/client.entity';
import { Tenant } from '../tenants/tenant.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const { client_id, tenant_id, ...rest } = createActivityDto;

    const client = await this.clientRepository.findOneBy({ client_id });
    if (!client) {
      throw new NotFoundException(`Client with ID "${client_id}" not found`);
    }

    const tenant = await this.tenantRepository.findOneBy({ tenant_id });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${tenant_id}" not found`);
    }

    // Ensure we are creating a single entity object.
    const newActivity = this.activityRepository.create({
      ...rest,
      client,
      tenant,
    });
    return this.activityRepository.save(newActivity);
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

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const { client_id, ...rest } = updateActivityDto;

    // Preload finds the entity and applies the new values from the DTO.
    const activity = await this.activityRepository.preload({
      activity_id: id,
      ...rest,
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }

    if (client_id) {
      const client = await this.clientRepository.findOneBy({ client_id });
      if (!client) {
        throw new NotFoundException(`Client with ID "${client_id}" not found`);
      }
      activity.client = client;
    }
    return this.activityRepository.save(activity);
  }

  async remove(id: string): Promise<void> {
    const result = await this.activityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
  }
}
