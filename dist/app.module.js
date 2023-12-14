"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_module_1 = require("./client/client.module");
const main_module_1 = require("./main/main.module");
const constants_1 = require("./constants/constants");
const schedule_1 = require("@nestjs/schedule");
const image_module_1 = require("./image/image.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(constants_1.AWS_DEV_MONGODB_URI, {
                dbName: 'justin1',
                useCreateIndex: undefined,
            }),
            schedule_1.ScheduleModule.forRoot(),
            main_module_1.MainModule,
            image_module_1.ImageModule,
            client_module_1.ClientModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map