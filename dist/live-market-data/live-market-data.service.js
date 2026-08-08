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
exports.LiveMarketDataService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
const instruments_service_1 = require("../instruments/instruments.service");
const price_service_1 = require("./price.service");
let LiveMarketDataService = class LiveMarketDataService {
    instrumentService;
    priceService;
    constructor(instrumentService, priceService) {
        this.instrumentService = instrumentService;
        this.priceService = priceService;
    }
    create(createLiveMarketDatumDto) {
        return 'This action adds a new liveMarketDatum';
    }
    async findAll(date) {
        return await pool_1.pool.query(queries_1.queries.GET_LIVE_MARKET_DATA, [date]);
    }
    async batchCreate(data) {
        const instruments = await this.instrumentService.findAll();
        const instrumentMap = new Map(instruments.map((instrument) => [instrument.instrument_name.toLowerCase(), instrument.instrument_id]));
        const convertToMysqlDate = (dateStr) => {
            const [day, monthStr, year] = dateStr.split('-');
            const months = {
                Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
            };
            const month = months[monthStr];
            const paddedDay = day.padStart(2, '0');
            return `${year}-${month}-${paddedDay}`;
        };
        const instrumentNameResolver = ({ instrument }) => {
            return instrumentMap.get(instrument?.toLowerCase()) || instrumentMap.get('nse:' + instrument?.toLowerCase());
        };
        let date = null;
        const feedInserts = data.filter(instrumentNameResolver).map((d) => {
            date = d?.date.trim();
            return [
                date,
                instrumentNameResolver(d),
                d.open?.trim(),
                d.high?.trim(),
                d.low?.trim(),
                d.close?.trim(),
                d.ltp?.trim()
            ];
        });
        const targetPrices = await this.priceService.getTargetPrices();
        targetPrices.forEach((tp) => {
            feedInserts.push([
                date,
                instrumentNameResolver({ instrument: tp.symbol }),
                0,
                0,
                0,
                tp.price,
                0
            ]);
        });
        await pool_1.pool.query(queries_1.queries.BULK_MARKET_DATA, [feedInserts]);
        return feedInserts;
    }
    findOne(id) {
        return `This action returns a #${id} liveMarketDatum`;
    }
    update(id, updateLiveMarketDatumDto) {
        return `This action updates a #${id} liveMarketDatum`;
    }
    remove(id) {
        return `This action removes a #${id} liveMarketDatum`;
    }
};
exports.LiveMarketDataService = LiveMarketDataService;
exports.LiveMarketDataService = LiveMarketDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [instruments_service_1.InstrumentsService,
        price_service_1.PriceService])
], LiveMarketDataService);
//# sourceMappingURL=live-market-data.service.js.map