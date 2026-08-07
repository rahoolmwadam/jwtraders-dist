import { LiveMarketDataService } from './live-market-data.service';
import { CreateLiveMarketDatumDto } from './dto/create-live-market-datum.dto';
import { UpdateLiveMarketDatumDto } from './dto/update-live-market-datum.dto';
import { AppService } from "../app.service";
export declare class LiveMarketDataController {
    private readonly liveMarketDataService;
    private readonly appService;
    constructor(liveMarketDataService: LiveMarketDataService, appService: AppService);
    create(createLiveMarketDatumDto: CreateLiveMarketDatumDto): string;
    uploadFile(file: any): Promise<{
        data: any[];
        affetedRows: any[][];
    }>;
    findAll(date: string): Promise<import("mysql2").QueryResult>;
    update(id: string, updateLiveMarketDatumDto: UpdateLiveMarketDatumDto): string;
    remove(id: string): string;
}
