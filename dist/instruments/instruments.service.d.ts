import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
export declare class InstrumentsService {
    create(dto: CreateInstrumentDto): Promise<{
        instrument_name: string;
        instrument_type: string;
        instrument_description: string;
        instrument_id: number;
    }>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateInstrumentDto): Promise<{
        instrument_name?: string | undefined;
        instrument_type?: string | undefined;
        instrument_description?: string | undefined;
        instrument_id: number;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
