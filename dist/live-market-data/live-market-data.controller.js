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
exports.LiveMarketDataController = void 0;
const common_1 = require("@nestjs/common");
const live_market_data_service_1 = require("../live-market-data.service");
const create_live_market_datum_dto_1 = require("./dto/create-live-market-datum.dto");
const update_live_market_datum_dto_1 = require("./dto/update-live-market-datum.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const app_service_1 = require("../app.service");
let LiveMarketDataController = class LiveMarketDataController {
    liveMarketDataService;
    appService;
    constructor(liveMarketDataService, appService) {
        this.liveMarketDataService = liveMarketDataService;
        this.appService = appService;
    }
    create(createLiveMarketDatumDto) {
        return this.liveMarketDataService.create(createLiveMarketDatumDto);
    }
    async uploadFile(file) {
        const data = await this.appService.parseCsvLiveMarketData(file.buffer);
        const affetedRows = await this.liveMarketDataService.batchCreate(data);
        return {
            data,
            affetedRows
        };
    }
    async findAll(date) {
        const [rows] = await this.liveMarketDataService.findAll(date);
        return rows;
    }
    update(id, updateLiveMarketDatumDto) {
        return this.liveMarketDataService.update(+id, updateLiveMarketDatumDto);
    }
    remove(id) {
        return this.liveMarketDataService.remove(+id);
    }
};
exports.LiveMarketDataController = LiveMarketDataController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_live_market_datum_dto_1.CreateLiveMarketDatumDto]),
    __metadata("design:returntype", void 0)
], LiveMarketDataController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LiveMarketDataController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LiveMarketDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_live_market_datum_dto_1.UpdateLiveMarketDatumDto]),
    __metadata("design:returntype", void 0)
], LiveMarketDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LiveMarketDataController.prototype, "remove", null);
exports.LiveMarketDataController = LiveMarketDataController = __decorate([
    (0, common_1.Controller)('api/live-market-data'),
    __metadata("design:paramtypes", [live_market_data_service_1.LiveMarketDataService,
        app_service_1.AppService])
], LiveMarketDataController);
//# sourceMappingURL=live-market-data.controller.js.map