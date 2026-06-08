import { CreateSystemParameterDto } from './dto/create-system-parameter.dto';
import { UpdateSystemParameterDto } from './dto/update-system-parameter.dto';
export declare class SystemParametersService {
    create(dto: CreateSystemParameterDto): string;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    findByMarket(marketType: string): Promise<any>;
    update(id: number, dto: UpdateSystemParameterDto): Promise<{
        brokerage?: number | undefined;
        charges?: number | undefined;
        tax_percent?: number | undefined;
        usd_value?: number | undefined;
        system_params_id: number;
    }>;
    remove(id: number): string;
}
