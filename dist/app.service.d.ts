export declare class AppService {
    getHello(): string;
    private readonly allowedHeaderMapping;
    parseCsv(fileBuffer: Buffer, marketType: string): Promise<any[]>;
}
