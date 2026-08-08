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
exports.StockListController = void 0;
const common_1 = require("@nestjs/common");
const stock_list_service_1 = require("./stock-list.service");
const create_stock_list_dto_1 = require("./dto/create-stock-list.dto");
const update_stock_list_dto_1 = require("./dto/update-stock-list.dto");
let StockListController = class StockListController {
    stockListService;
    constructor(stockListService) {
        this.stockListService = stockListService;
    }
    create(createStockListDto) {
        return this.stockListService.create(createStockListDto);
    }
    findAll(marketType) {
        return this.stockListService.findAll(marketType);
    }
    findOne(id) {
        return this.stockListService.findOne(+id);
    }
    update(id, updateStockListDto) {
        return this.stockListService.update(+id, updateStockListDto);
    }
    remove(id) {
        return this.stockListService.remove(+id);
    }
};
exports.StockListController = StockListController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_list_dto_1.CreateStockListDto]),
    __metadata("design:returntype", void 0)
], StockListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('market/:marketType'),
    __param(0, (0, common_1.Param)('marketType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_list_dto_1.UpdateStockListDto]),
    __metadata("design:returntype", void 0)
], StockListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockListController.prototype, "remove", null);
exports.StockListController = StockListController = __decorate([
    (0, common_1.Controller)('api/stock-list'),
    __metadata("design:paramtypes", [stock_list_service_1.StockListService])
], StockListController);
//# sourceMappingURL=stock-list.controller.js.map