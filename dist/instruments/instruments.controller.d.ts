import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
export declare class InstrumentsController {
    private readonly instrumentsService;
    constructor(instrumentsService: InstrumentsService);
    create(createInstrumentDto: CreateInstrumentDto): Promise<{
        instrument_name: string;
        instrument_type: string;
        instrument_description: string;
        instrument_id: number;
    }>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    update(id: string, updateInstrumentDto: UpdateInstrumentDto): Promise<{
        instrument_name?: string | undefined;
        instrument_type?: string | undefined;
        instrument_description?: string | undefined;
        instrument_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
