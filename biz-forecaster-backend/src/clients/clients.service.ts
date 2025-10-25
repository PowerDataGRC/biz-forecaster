
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/client.entity';
import { SeederService } from '../seeder/seeder.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly seederService: SeederService,
  ) {}

  async create(clientData: Partial<Client>): Promise<Client> {
    const newClient = this.clientRepository.create(clientData);
    const savedClient = await this.clientRepository.save(newClient);
    await this.seederService.seedClientActivities(savedClient);
    return savedClient;
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async update(id: number, clientData: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, clientData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
