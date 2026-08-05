"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvService = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
let CsvService = class CsvService {
    allowedHeaderMapping = {
        'sellOrders': {
            'Date': 'buy_date',
            'Buy price': 'buy_price',
            'Qty': 'buy_qty',
            'Sell price': 'sell_price',
            'Sell date': 'sell_date',
            'Loan percent': 'loan_percent',
            'Stock': 'instrument',
            'Customer ID': 'customer_id'
        },
        'bhavCopy': {}
    };
    async parseCsv(fileBuffer, marketType) {
        return new Promise((resolve, reject) => {
            const results = [];
            const stream = stream_1.Readable.from(fileBuffer);
            stream
                .pipe((0, csv_parser_1.default)({
                mapHeaders: ({ header }) => {
                    const trimmedHeader = header.trim();
                    return this.allowedHeaderMapping['sellOrders'][trimmedHeader] || null;
                },
            }))
                .on('data', (data) => {
                const enrichedData = {
                    ...data,
                    market_type: marketType
                };
                if (enrichedData.instrument) {
                    results.push(enrichedData);
                }
            })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
};
exports.CsvService = CsvService;
exports.CsvService = CsvService = __decorate([
    (0, common_1.Injectable)()
], CsvService);
//# sourceMappingURL=csv.service.js.map