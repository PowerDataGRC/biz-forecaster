import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { TenantContextService } from '../tenants/tenant-context.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const tenantSchema = this.tenantContext.schema;
    const newClient = this.clientsRepository.create({
      ...createClientDto,
      tenantSchema,
    });
    return this.clientsRepository.save(newClient);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find({
      where: { tenantSchema: this.tenantContext.schema },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id, tenantSchema: this.tenantContext.schema },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id); // Ensures the client exists and belongs to the tenant
    const updated = Object.assign(client, updateClientDto);
    return this.clientsRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clientsRepository.delete({ id, tenantSchema: this.tenantContext.schema });
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
  }
}