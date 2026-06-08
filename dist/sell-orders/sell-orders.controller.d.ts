import { SellOrdersService } from './sell-orders.service';
import { CreateSellOrderDto } from './dto/create-sell-order.dto';
import { UpdateSellOrderDto } from './dto/update-sell-order.dto';
import { AppService } from "../app.service";
export declare class SellOrdersController {
    private readonly sellOrdersService;
    private readonly appService;
    constructor(sellOrdersService: SellOrdersService, appService: AppService);
    uploadFile(marketType: any, file: any): Promise<{
        marketType: any;
        data: any[];
        affetedRows: Promise<number[]>;
    }>;
    batchCreate(createSellOrderDto: CreateSellOrderDto[]): Promise<number[]>;
    create(createSellOrderDto: CreateSellOrderDto): Promise<any>;
    findAll(marketType: string): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    update(id: string, updateSellOrderDto: UpdateSellOrderDto): Promise<{
        order_id?: number | undefined;
        instrument_id?: number | undefined;
        instrument?: string | undefined;
        is_average?: string | undefined;
        customer_id?: number | null | undefined;
        market_type?: string | undefined;
        buy_date?: string | undefined;
        buy_qty?: number | undefined;
        buy_price?: number | undefined;
        sell_date?: string | undefined;
        sell_qty?: number | undefined;
        sell_price?: number | undefined;
        sell_order_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
