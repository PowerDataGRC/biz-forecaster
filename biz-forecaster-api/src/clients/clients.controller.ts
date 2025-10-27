import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':client_id')
  findOne(@Param('client_id') client_id: string) {
    return this.clientsService.findOne(client_id);
  }

  @Patch(':client_id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('client_id') client_id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(client_id, updateClientDto);
  }

  @Delete(':client_id')
  remove(@Param('client_id') client_id: string) {
    return this.clientsService.remove(client_id);
  }
}
