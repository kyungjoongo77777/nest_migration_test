import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateImageDto, UpdateImageDto} from './dto/image.dto';
import {Image} from './interfaces/image.interface';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class ImageService {
    constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {

    }

    async create(createClientDto: CreateImageDto): Promise<Image> {
        try {
            const _imageOne = new this.imageModel(createClientDto);
            return await _imageOne.save();
        } catch (error) {
            throw new HttpException('Error creating client', HttpStatus.BAD_REQUEST);
        }
    }

    async update(updateImageDto: UpdateImageDto, id: string): Promise<Image> {
        try {
            const image = await this.findById(id);
            // client.author = updateClientDto.author;
            // client.age = updateClientDto.age;
            // client.body = updateClientDto.body;
            return await image.save();
        } catch (error) {
            throw new HttpException('Error updating client', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return this.imageModel.deleteOne({"_id": id});
        } catch (error) {
            throw new HttpException('Error deleting client', HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Image> {
        let image: Image;
        try {
            image = await this.imageModel.findById(id).exec();
            return image || null;
        } catch (error) {
            return null;
        }
    }

    /* async getClient(clientId: string) {
         const client = await this.findById(clientId);
         if (!client) {
             throw new NotFoundException('Could not find client.');
         }
         return client;
     }*/

    async findByCondition(searchWord: string, curPage: number): Promise<Image[]> {

        const pageSize = 6;
        let skip = curPage - 1;

        let results = await this.imageModel
            .find({
                $or: [
                    {frameDesc: {$regex: '.*' + searchWord + '.*', $options: 'i'}},
                    {frameEngDesc: {$regex: '.*' + searchWord + '.*', $options: 'i'}},
                    {weaponType: {$regex: '.*' + searchWord + '.*', $options: 'i'}},
                    {streamId: {$regex: '.*' + searchWord + '.*', $options: 'i'}},
                    {uid: {$regex: '.*' + searchWord + '.*', $options: 'i'}},
                ],
            }).limit(pageSize).skip(pageSize * skip).exec()


        return results;
    }
}
