import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './client.entity';
import { TenantContextService } from '../tenants/tenant-context.service'; // For getting the current schema
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class ClientsService {
  constructor(
    // The injected repository is now for the public schema and won't be used directly.
    // We keep it to satisfy TypeORM's module initialization.
    @InjectRepository(Client) private readonly clientsRepository: Repository<Client>,
    private readonly tenantContext: TenantContextService, // Inject TenantContextService
    private readonly tenantsService: TenantsService, // Inject TenantsService
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // Use executeInTenant to run the operation in the correct schema
    return this.tenantsService.executeInTenant(
      this.tenantContext.schema,
      Client,
      async (repo) => {
        const newClient = repo.create(createClientDto);
        return repo.save(newClient);
      },
    );
  }

  findAll(): Promise<Client[]> {
    return this.tenantsService.executeInTenant(
      this.tenantContext.schema,
      Client,
      (repo) => repo.find(),
    );
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.tenantsService.executeInTenant(
      this.tenantContext.schema,
      Client,
      (repo) => repo.findOneBy({ client_id: id }),
    );

    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    return this.tenantsService.executeInTenant(
      this.tenantContext.schema,
      Client,
      async (repo) => { // Use async here
        // First, ensure the client exists within the tenant's schema.
        const clientToUpdate = await repo.findOneBy({ client_id: id });
        if (!clientToUpdate) {
          throw new NotFoundException(`Client with ID "${id}" not found in this tenant.`);
        }
        // Merge the changes from the DTO into the found entity.
        const updatedClient = repo.merge(clientToUpdate, updateClientDto);
        // Save the updated entity.
        return repo.save(updatedClient);
      }
    );
  }

  async remove(id: string): Promise<void> {
    const result = await this.tenantsService.executeInTenant(this.tenantContext.schema, Client, (repo) => repo.delete(id));
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
  }
}