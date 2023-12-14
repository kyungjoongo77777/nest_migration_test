import { Model } from 'mongoose';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { Client } from './interfaces/client.interface';
export declare class ClientService {
    private readonly clientModel;
    constructor(clientModel: Model<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    update(updateClientDto: UpdateClientDto, id: string): Promise<Client>;
    delete(id: string): Promise<any>;
    findClient(id: string): Promise<Client>;
    getClient(clientId: string): Promise<Client>;
    findAll(): Promise<Client[]>;
}
