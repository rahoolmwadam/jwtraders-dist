import { CsvService } from './csv.service';
export declare class AppService {
    private readonly csvService;
    constructor(csvService: CsvService);
    getHello(): string;
    parseCsvSellOrders(fileBuffer: Buffer, marketType: string): Promise<any[]>;
}
