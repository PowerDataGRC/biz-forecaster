
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const user = await this.userRepository.findOne({ where: { user_id: createActivityDto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${createActivityDto.user_id}" not found`);
    }

    let client: Client | undefined;
    if (createActivityDto.client_id) {
      client = await this.clientRepository.findOne({ where: { client_id: createActivityDto.client_id } });
      if (!client) {
        throw new NotFoundException(`Client with ID "${createActivityDto.client_id}" not found`);
      }
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      user,
      client,
    });

    return this.activityRepository.save(activity);
  }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['user', 'client'] });
  }

  async findAllByClient(clientId: string): Promise<Activity[]> {
    return this.activityRepository.find({ where: { client: { client_id: clientId } }, relations: ['user', 'client'] });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: id }, relations: ['user', 'client'] });
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id);
    const { user_id, client_id, ...rest } = updateActivityDto;

    if (user_id) {
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${user_id}" not found`);
      }
      activity.user = user;
    }

    if (client_id) {
      const client = await this.clientRepository.findOne({ where: { client_id } });
      if (!client) {
        throw new NotFoundException(`Client with ID "${client_id}" not found`);
      }
      activity.client = client;
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
