import {Controller, Get, Render} from '@nestjs/common';

@Controller('/')
export class MainController {

    constructor() {
    }

    @Get()
    @Render('index.ejs')
    root() {
        return { message: 'hi! guys.!!!' };
    }

}
