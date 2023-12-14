import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ClientService} from './client.service';
import {CreateClientDto, UpdateClientDto} from './dto/client.dto';
import {Client} from './interfaces/client.interface';

@Controller('client')
export class ClientController {

    constructor(private readonly clientsService: ClientService) {
    }


    @Post()
    async create(@Body() createArticleDto: CreateClientDto) {
        await this.clientsService.create(createArticleDto);
    }

    @Get()
    async findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @Delete('/:id')
    async delete(@Param('id') id) {
        await this.clientsService.delete(id);
    }

    @Put('/:id')
    async update(@Body() updateClientDto: UpdateClientDto, @Param('id') id
                 //, @Headers(JWT_HEADER_PARAM) token
    ) {
        return await this.clientsService.update(updateClientDto, id);
    }

}
