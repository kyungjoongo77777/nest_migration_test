"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const client_dto_1 = require("./dto/client.dto");
let ClientController = class ClientController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async create(createArticleDto) {
        await this.clientsService.create(createArticleDto);
    }
    async findAll() {
        return this.clientsService.findAll();
    }
    async delete(id) {
        await this.clientsService.delete(id);
    }
    async update(updateClientDto, id) {
        return await this.clientsService.update(updateClientDto, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.UpdateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map