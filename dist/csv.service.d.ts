export declare class CsvService {
    private readonly allowedHeaderMapping;
    parseCsv(fileBuffer: Buffer, marketType: string): Promise<any[]>;
    parseLiveMarketCsv(fileBuffer: Buffer, key: string): Promise<any[]>;
}
