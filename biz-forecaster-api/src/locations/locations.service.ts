import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const existing = await this.locationsRepository.findOne({
      where: { name: createLocationDto.name },
    });

    if (existing) {
      throw new ConflictException(`Location with name "${createLocationDto.name}" already exists.`);
    }

    const location = this.locationsRepository.create(createLocationDto);
    return this.locationsRepository.save(location);
  }

  findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationsRepository.findOneBy({ location_id: id });
    if (!location) {
      throw new NotFoundException(`Location with ID "${id}" not found.`);
    }
    return location;
  }

  async findOneByName(name: string): Promise<Location> {
    const location = await this.locationsRepository.findOneBy({ name });
    if (!location) {
      throw new NotFoundException(`Location with name "${name}" not found.`);
    }
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationsRepository.preload({
      location_id: id,
      ...updateLocationDto,
    });

    if (!location) {
      throw new NotFoundException(`Location with ID "${id}" not found`);
    }

    return this.locationsRepository.save(location);
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID "${id}" not found`);
    }
  }
}