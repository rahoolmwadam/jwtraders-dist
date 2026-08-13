import { CsvService } from './csv.service';
import { HttpService } from '@nestjs/axios';
import { LiveMarketDataService } from './live-market-data.service';
export declare class AppService {
    private readonly csvService;
    private readonly httpService;
    private readonly liveMarketDataService;
    constructor(csvService: CsvService, httpService: HttpService, liveMarketDataService: LiveMarketDataService);
    getHello(): string;
    parseCsvSellOrders(fileBuffer: Buffer, marketType: string): Promise<any[]>;
    parseCsvLiveMarketData(fileBuffer: Buffer): Promise<any[]>;
    importLiveFeed(spreadsheetId: string): Promise<any[]>;
}
