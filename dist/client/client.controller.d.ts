import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { Client } from './interfaces/client.interface';
export declare class ClientController {
    private readonly clientsService;
    constructor(clientsService: ClientService);
    create(createArticleDto: CreateClientDto): Promise<void>;
    findAll(): Promise<Client[]>;
    delete(id: any): Promise<void>;
    update(updateClientDto: UpdateClientDto, id: any): Promise<Client>;
}
