import {Module} from '@nestjs/common';
import {ClientController} from './client.controller';
import {ClientService} from './client.service';
import {ClientSchema} from './schemas/client.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Client', schema: ClientSchema}])],
    controllers: [ClientController],
    providers: [ClientService],
})
export class ClientModule {

}
