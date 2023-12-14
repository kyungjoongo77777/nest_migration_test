import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import Moralis from "moralis";


async function bootstrap() {
    //const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });
    await app.listen(process.env.PORT || 4000);


    await Moralis.start({
        apiKey: 'Ij7DZmjJW7fTnSn3Co4XreZUQLxYJzfRZWtB6KdT3fxWpgBi20vLssWMp1M3CpiF'

    });


    app.enableCors();
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('ejs');
}

bootstrap();
