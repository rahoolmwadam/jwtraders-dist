import { HttpService } from '@nestjs/axios';
interface TickerPrice {
    symbol: string;
    price: string;
    time: number;
}
export declare class PriceService {
    private readonly httpService;
    private readonly logger;
    private readonly url;
    private readonly targetSymbols;
    constructor(httpService: HttpService);
    getTargetPrices(): Promise<TickerPrice[]>;
}
export {};
