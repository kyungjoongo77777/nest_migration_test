import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ImageService} from './image.service';
import {CreateImageDto, UpdateImageDto} from './dto/image.dto';
import {Image} from './interfaces/image.interface';

@Controller('image')
export class ImageController {

    constructor(private readonly imageService: ImageService) {
    }


    @Post()
    async create(@Body() createArticleDto: CreateImageDto) {
        await this.imageService.create(createArticleDto);
    }

    @Get('/:searchWord/:page')
    async findAll(@Param('searchWord') searchWord:any, @Param('page') page:any): Promise<Image[]> {

        return this.imageService.findByCondition(searchWord, page);
    }

    @Get("")
    async findImage(): Promise<Image[]> {
        return this.imageService.findAll();
    }

    @Delete('/:id')
    async delete(@Param('id') id) {
        await this.imageService.delete(id);
    }

    @Put('/:id')
    async update(@Body() updateClientDto: UpdateImageDto, @Param('id') id: any
                 //, @Headers(JWT_HEADER_PARAM) token
    ) {
        return await this.imageService.update(updateClientDto, id);
    }

}
