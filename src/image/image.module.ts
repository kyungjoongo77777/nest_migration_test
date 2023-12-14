import {Module} from '@nestjs/common';
import {ImageController} from './image.controller';
import {ImageService} from './image.service';
import {ImageSchema} from './schemas/image.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Image', schema: ImageSchema}])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule {

}
