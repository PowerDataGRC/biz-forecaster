import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./client.entity").Client>;
    findAll(): Promise<import("./client.entity").Client[]>;
    findOne(id: string): Promise<import("./client.entity").Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("./client.entity").Client>;
    remove(id: string): Promise<void>;
}
