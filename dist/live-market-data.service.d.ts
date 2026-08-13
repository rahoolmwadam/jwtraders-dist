import { CreateLiveMarketDatumDto } from './live-market-data/dto/create-live-market-datum.dto';
import { UpdateLiveMarketDatumDto } from './live-market-data/dto/update-live-market-datum.dto';
import { PriceService } from './price.service';
import { InstrumentsService } from './instruments.service';
export declare class LiveMarketDataService {
    private readonly instrumentService;
    private readonly priceService;
    constructor(instrumentService: InstrumentsService, priceService: PriceService);
    create(createLiveMarketDatumDto: CreateLiveMarketDatumDto): string;
    findAll(date?: any): Promise<[import("mysql2").QueryResult, import("mysql2").FieldPacket[]]>;
    batchCreate(data: CreateLiveMarketDatumDto[]): Promise<any[][]>;
    findOne(id: number): string;
    update(id: number, updateLiveMarketDatumDto: UpdateLiveMarketDatumDto): string;
    remove(id: number): string;
}
