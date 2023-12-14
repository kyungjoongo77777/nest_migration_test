import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateClientDto, UpdateClientDto} from './dto/client.dto';
import {Client} from './interfaces/client.interface';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class ClientService {
    constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {

    }

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            const _client = new this.clientModel(createClientDto);
            return await _client.save();
        } catch (error) {
            throw new HttpException('Error creating client', HttpStatus.BAD_REQUEST);
        }
    }

    async update(updateClientDto: UpdateClientDto, id: string): Promise<Client> {
        try {
            const client = await this.findClient(id);
            client.author = updateClientDto.author;
            client.age = updateClientDto.age;
            client.body = updateClientDto.body;
            return await client.save();
        } catch (error) {
            throw new HttpException('Error updating client', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return this.clientModel.deleteOne({"_id": id});
        } catch (error) {
            throw new HttpException('Error deleting client', HttpStatus.BAD_REQUEST);
        }
    }

    async findClient(id: string): Promise<Client> {
        let client;
        try {
            client = await this.clientModel.findById(id).exec();
            return client || null;
        } catch (error) {
            return null;
        }
    }

    async getClient(clientId: string) {
        const client = await this.findClient(clientId);
        if (!client) {
            throw new NotFoundException('Could not find client.');
        }
        return client;
    }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().select({__v: 0}).exec();
    }
}
