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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const csv_service_1 = require("./csv.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const live_market_data_service_1 = require("./live-market-data.service");
let AppService = class AppService {
    csvService;
    httpService;
    liveMarketDataService;
    constructor(csvService, httpService, liveMarketDataService) {
        this.csvService = csvService;
        this.httpService = httpService;
        this.liveMarketDataService = liveMarketDataService;
    }
    getHello() {
        return 'Hello World!';
    }
    parseCsvSellOrders(fileBuffer, marketType) {
        return this.csvService.parseCsv(fileBuffer, marketType);
    }
    parseCsvLiveMarketData(fileBuffer) {
        return this.csvService.parseLiveMarketCsv(fileBuffer, 'live-market-data');
    }
    async importLiveFeed(spreadsheetId) {
        const googleExportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
        const googleResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(googleExportUrl, { responseType: 'stream' }));
        let data = await this.csvService.parseLiveMarketCsv(googleResponse.data, 'live-market-data');
        data = await this.liveMarketDataService.batchCreate(data);
        return data;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [csv_service_1.CsvService,
        axios_1.HttpService,
        live_market_data_service_1.LiveMarketDataService])
], AppService);
//# sourceMappingURL=app.service.js.map