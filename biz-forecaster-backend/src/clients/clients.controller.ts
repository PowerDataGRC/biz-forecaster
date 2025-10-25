import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() clientData: Partial<Client>): Promise<Client> {
    return this.clientsService.create(clientData);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':client_id')
  findOne(@Param('client_id') client_id: string): Promise<Client> {
    return this.clientsService.findOne(client_id);
  }

  @Put(':client_id')
  update(@Param('client_id') client_id: string, @Body() clientData: Partial<Client>): Promise<Client> {
    return this.clientsService.update(client_id, clientData);
  }

  @Delete(':client_id')
  remove(@Param('client_id') client_id: string): Promise<void> {
    return this.clientsService.remove(client_id);
  }
}
