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
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ImageService = class ImageService {
    constructor(imageModel) {
        this.imageModel = imageModel;
    }
    async create(createClientDto) {
        try {
            const _imageOne = new this.imageModel(createClientDto);
            return await _imageOne.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(updateImageDto, id) {
        try {
            const image = await this.findById(id);
            return await image.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error updating client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            return this.imageModel.deleteOne({ "_id": id });
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting client', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        let image;
        try {
            image = await this.imageModel.findById(id).exec();
            return image || null;
        }
        catch (error) {
            return null;
        }
    }
    async findAll() {
        const imageList = await this.imageModel.find().exec();
        if (!imageList) {
            throw new common_1.NotFoundException('Could not find imageList.');
        }
        return imageList;
    }
    async findByCondition(searchWord, curPage) {
        const pageSize = 6;
        let skip = curPage - 1;
        let results = await this.imageModel
            .find({
            $or: [
                { frameDesc: { $regex: '.*' + searchWord + '.*', $options: 'i' } },
                { frameEngDesc: { $regex: '.*' + searchWord + '.*', $options: 'i' } },
                { weaponType: { $regex: '.*' + searchWord + '.*', $options: 'i' } },
                { streamId: { $regex: '.*' + searchWord + '.*', $options: 'i' } },
                { uid: { $regex: '.*' + searchWord + '.*', $options: 'i' } },
            ],
        }).limit(pageSize).skip(pageSize * skip).exec();
        return results;
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Image')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map