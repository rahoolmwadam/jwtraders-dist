import { SystemParametersService } from './system-parameters.service';
import { CreateSystemParameterDto } from './dto/create-system-parameter.dto';
import { UpdateSystemParameterDto } from './dto/update-system-parameter.dto';
export declare class SystemParametersController {
    private readonly systemParametersService;
    constructor(systemParametersService: SystemParametersService);
    create(createSystemParameterDto: CreateSystemParameterDto): string;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    update(id: string, updateSystemParameterDto: UpdateSystemParameterDto): Promise<{
        brokerage?: number | undefined;
        charges?: number | undefined;
        tax_percent?: number | undefined;
        usd_value?: number | undefined;
        system_params_id: number;
    }>;
    remove(id: string): string;
}
