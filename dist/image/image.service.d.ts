import { Model } from 'mongoose';
import { CreateImageDto, UpdateImageDto } from './dto/image.dto';
import { Image } from './interfaces/image.interface';
export declare class ImageService {
    private readonly imageModel;
    constructor(imageModel: Model<Image>);
    create(createClientDto: CreateImageDto): Promise<Image>;
    update(updateImageDto: UpdateImageDto, id: string): Promise<Image>;
    delete(id: string): Promise<any>;
    findById(id: string): Promise<Image>;
    findAll(): Promise<Image[]>;
    findByCondition(searchWord: string, curPage: number): Promise<Image[]>;
}
