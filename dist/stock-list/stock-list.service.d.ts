import { CreateStockListDto } from './dto/create-stock-list.dto';
import { UpdateStockListDto } from './dto/update-stock-list.dto';
export declare class StockListService {
    create(createStockListDto: CreateStockListDto): string;
    findAll(marketType: any): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateStockListDto): Promise<{
        stock_list_id: number;
        investment?: number | undefined;
        parts?: number | undefined;
    }>;
    remove(id: number): string;
    findFib(id: any): Promise<import("mysql2").QueryResult>;
}
