"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const moralis_1 = __importDefault(require("moralis"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    await app.listen(process.env.PORT || 3000);
    await moralis_1.default.start({
        apiKey: 'Ij7DZmjJW7fTnSn3Co4XreZUQLxYJzfRZWtB6KdT3fxWpgBi20vLssWMp1M3CpiF'
    });
    app.enableCors();
}
bootstrap();
//# sourceMappingURL=main.js.map