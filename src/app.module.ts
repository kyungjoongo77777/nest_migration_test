import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ClientModule} from "./client/client.module";
import {MainModule} from "./main/main.module";
import {AWS_DEV_MONGODB_URI} from "./constants/constants";
import {ScheduleModule} from "@nestjs/schedule";
import {ImageModule} from "./image/image.module";
import {ChatGateway} from "./chat/ChatGateway";


@Module({
    imports: [
        MongooseModule.forRoot(AWS_DEV_MONGODB_URI, {
            dbName: 'justin1',
            useCreateIndex: undefined,
        }),
        ScheduleModule.forRoot(),//todo: import ScheduleModule
        MainModule,
        ImageModule,
        ClientModule,
    ],
    providers :[
        ChatGateway
    ]
})
export class AppModule {
}
