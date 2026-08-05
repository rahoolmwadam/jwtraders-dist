export declare class CsvService {
    private readonly allowedHeaderMapping;
    parseCsv(fileBuffer: Buffer, marketType: string): Promise<any[]>;
}
