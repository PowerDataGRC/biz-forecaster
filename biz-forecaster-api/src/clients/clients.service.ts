import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { User } from '../users/user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { user_id, tenant_id, ...rest } = createClientDto;

    const user = await this.userRepository.findOneBy({ user_id });
    if (!user) {
      throw new NotFoundException(`User with ID "${user_id}" not found`);
    }

    const tenant = await this.tenantRepository.findOneBy({ tenant_id });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${tenant_id}" not found`);
    }

    const newClient = this.clientRepository.create({ ...rest, user, tenant });
    return this.clientRepository.save(newClient);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({ relations: ['user', 'tenant'] });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { client_id: id }, relations: ['user', 'tenant'] });
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.preload({
      client_id: id,
      ...updateClientDto,
    });
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    await this.clientRepository.save(client);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
  }
}
