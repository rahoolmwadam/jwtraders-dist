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
exports.SellOrdersController = void 0;
const common_1 = require("@nestjs/common");
const sell_orders_service_1 = require("./sell-orders.service");
const create_sell_order_dto_1 = require("./dto/create-sell-order.dto");
const update_sell_order_dto_1 = require("./dto/update-sell-order.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const app_service_1 = require("../app.service");
let SellOrdersController = class SellOrdersController {
    sellOrdersService;
    appService;
    constructor(sellOrdersService, appService) {
        this.sellOrdersService = sellOrdersService;
        this.appService = appService;
    }
    async uploadFile(marketType, file) {
        const data = await this.appService.parseCsv(file.buffer);
        const affetedRows = this.sellOrdersService.batchCreate(data);
        return {
            marketType,
            data,
            affetedRows
        };
    }
    batchCreate(createSellOrderDto) {
        return this.sellOrdersService.averageCreate(createSellOrderDto);
    }
    create(createSellOrderDto) {
        return this.sellOrdersService.create(createSellOrderDto);
    }
    findAll(marketType) {
        return this.sellOrdersService.findAll(marketType);
    }
    findOne(id) {
        return this.sellOrdersService.findOne(+id);
    }
    update(id, updateSellOrderDto) {
        return this.sellOrdersService.update(+id, updateSellOrderDto);
    }
    remove(id) {
        return this.sellOrdersService.remove(+id);
    }
};
exports.SellOrdersController = SellOrdersController;
__decorate([
    (0, common_1.Post)('upload/:marketType'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('marketType')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SellOrdersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('average'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sell_order_dto_1.CreateSellOrderDto]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('market/:marketType'),
    __param(0, (0, common_1.Param)('marketType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sell_order_dto_1.UpdateSellOrderDto]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellOrdersController.prototype, "remove", null);
exports.SellOrdersController = SellOrdersController = __decorate([
    (0, common_1.Controller)('api/sell-orders'),
    __metadata("design:paramtypes", [sell_orders_service_1.SellOrdersService,
        app_service_1.AppService])
], SellOrdersController);
//# sourceMappingURL=sell-orders.controller.js.map