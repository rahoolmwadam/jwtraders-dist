import { CreateLiveMarketDatumDto } from './dto/create-live-market-datum.dto';
import { UpdateLiveMarketDatumDto } from './dto/update-live-market-datum.dto';
import { InstrumentsService } from "../instruments/instruments.service";
export declare class LiveMarketDataService {
    private readonly instrumentService;
    constructor(instrumentService: InstrumentsService);
    create(createLiveMarketDatumDto: CreateLiveMarketDatumDto): string;
    findAll(date?: any): Promise<[import("mysql2").QueryResult, import("mysql2").FieldPacket[]]>;
    batchCreate(data: CreateLiveMarketDatumDto[]): Promise<any[][]>;
    findOne(id: number): string;
    update(id: number, updateLiveMarketDatumDto: UpdateLiveMarketDatumDto): string;
    remove(id: number): string;
}
