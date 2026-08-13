"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveMarketDataModule = void 0;
const common_1 = require("@nestjs/common");
const common_module_1 = require("../common.module");
const instruments_module_1 = require("../instruments/instruments.module");
const live_market_data_controller_1 = require("./live-market-data.controller");
const live_market_data_service_1 = require("../live-market-data.service");
let LiveMarketDataModule = class LiveMarketDataModule {
};
exports.LiveMarketDataModule = LiveMarketDataModule;
exports.LiveMarketDataModule = LiveMarketDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [live_market_data_controller_1.LiveMarketDataController],
        providers: [live_market_data_service_1.LiveMarketDataService],
        imports: [instruments_module_1.InstrumentsModule, common_module_1.CommonModule],
        exports: [live_market_data_service_1.LiveMarketDataService]
    })
], LiveMarketDataModule);
//# sourceMappingURL=live-market-data.module.js.map