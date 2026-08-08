import { StockListService } from './stock-list.service';
import { CreateStockListDto } from './dto/create-stock-list.dto';
import { UpdateStockListDto } from './dto/update-stock-list.dto';
export declare class StockListController {
    private readonly stockListService;
    constructor(stockListService: StockListService);
    create(createStockListDto: CreateStockListDto): string;
    findAll(marketType: string): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    update(id: string, updateStockListDto: UpdateStockListDto): Promise<{
        stock_list_id: number;
        investment?: number | undefined;
        parts?: number | undefined;
    }>;
    remove(id: string): string;
}
