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
var PriceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PriceService = PriceService_1 = class PriceService {
    httpService;
    logger = new common_1.Logger(PriceService_1.name);
    url = 'http://fapi.binance.com/fapi/v1/ticker/price';
    targetSymbols = ['ETHUSDT', 'XAGUSDT', 'XAUUSDT', 'CLUSDT', 'NATGASUSDT'];
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getTargetPrices() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.url));
            const allTickers = response.data;
            return allTickers.filter((ticker) => this.targetSymbols.includes(ticker.symbol));
        }
        catch (error) {
            this.logger.error(`Failed to fetch prices from Binance: ${error.message}`);
            throw error;
        }
    }
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = PriceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PriceService);
//# sourceMappingURL=price.service.js.map