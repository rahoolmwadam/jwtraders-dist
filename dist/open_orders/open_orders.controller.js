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
exports.OpenOrdersController = void 0;
const common_1 = require("@nestjs/common");
const create_open_order_dto_1 = require("./dto/create-open_order.dto");
const update_open_order_dto_1 = require("./dto/update-open_order.dto");
const open_orders_service_1 = require("./open_orders.service");
let OpenOrdersController = class OpenOrdersController {
    openOrdersService;
    constructor(openOrdersService) {
        this.openOrdersService = openOrdersService;
    }
    create(createOpenOrderDto) {
        return this.openOrdersService.create(createOpenOrderDto);
    }
    findAll(marketType) {
        return this.openOrdersService.findAll(marketType);
    }
    findOne(id) {
        return this.openOrdersService.findOne(+id);
    }
    update(id, updateOpenOrderDto) {
        return this.openOrdersService.update(+id, updateOpenOrderDto);
    }
    remove(id) {
        return this.openOrdersService.remove(+id);
    }
};
exports.OpenOrdersController = OpenOrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_open_order_dto_1.CreateOpenOrderDto]),
    __metadata("design:returntype", void 0)
], OpenOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('market/:marketType'),
    __param(0, (0, common_1.Param)('marketType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpenOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpenOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_open_order_dto_1.UpdateOpenOrderDto]),
    __metadata("design:returntype", void 0)
], OpenOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpenOrdersController.prototype, "remove", null);
exports.OpenOrdersController = OpenOrdersController = __decorate([
    (0, common_1.Controller)('api/open-orders'),
    __metadata("design:paramtypes", [open_orders_service_1.OpenOrdersService])
], OpenOrdersController);
//# sourceMappingURL=open_orders.controller.js.map