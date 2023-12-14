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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ClientService = class ClientService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async create(createClientDto) {
        try {
            const _client = new this.clientModel(createClientDto);
            return await _client.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(updateClientDto, id) {
        try {
            const client = await this.findClient(id);
            client.author = updateClientDto.author;
            client.age = updateClientDto.age;
            client.body = updateClientDto.body;
            return await client.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error updating client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            return this.clientModel.deleteOne({ "_id": id });
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findClient(id) {
        let client;
        try {
            client = await this.clientModel.findById(id).exec();
            return client || null;
        }
        catch (error) {
            return null;
        }
    }
    async getClient(clientId) {
        const client = await this.findClient(clientId);
        if (!client) {
            throw new common_1.NotFoundException('Could not find client.');
        }
        return client;
    }
    async findAll() {
        return this.clientModel.find().select({ __v: 0 }).exec();
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Client')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map