import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const user = await this.userRepository.findOne({ where: { user_id: createActivityDto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${createActivityDto.user_id}" not found`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      user,
    });

    return this.activityRepository.save(activity);
  }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { activity_id: id }, relations: ['user'] });
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id);
    const { user_id, ...rest } = updateActivityDto;

    if (user_id) {
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${user_id}" not found`);
      }
      activity.user = user;
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
