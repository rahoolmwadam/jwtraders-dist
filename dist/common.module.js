"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const csv_service_1 = require("./csv.service");
const backup_service_1 = require("./backup.service");
const server_control_service_1 = require("./server-control.service");
const price_service_1 = require("./price.service");
const axios_1 = require("@nestjs/axios");
const live_market_data_service_1 = require("./live-market-data.service");
const instruments_service_1 = require("./instruments.service");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [app_service_1.AppService, csv_service_1.CsvService, backup_service_1.BackupService, server_control_service_1.ServerControlService, price_service_1.PriceService, live_market_data_service_1.LiveMarketDataService, instruments_service_1.InstrumentsService],
        exports: [app_service_1.AppService, csv_service_1.CsvService, backup_service_1.BackupService, server_control_service_1.ServerControlService, price_service_1.PriceService, live_market_data_service_1.LiveMarketDataService, instruments_service_1.InstrumentsService],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map