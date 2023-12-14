import { ImageService } from './image.service';
import { CreateImageDto, UpdateImageDto } from './dto/image.dto';
import { Image } from './interfaces/image.interface';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    create(createArticleDto: CreateImageDto): Promise<void>;
    findAll(searchWord: any, page: any): Promise<Image[]>;
    delete(id: any): Promise<void>;
    update(updateClientDto: UpdateImageDto, id: any): Promise<Image>;
}
