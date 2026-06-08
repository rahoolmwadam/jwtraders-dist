import { CreateOpenOrderDto } from './dto/create-open_order.dto';
import { UpdateOpenOrderDto } from './dto/update-open_order.dto';
import { OpenOrdersService } from './open_orders.service';
export declare class OpenOrdersController {
    private readonly openOrdersService;
    constructor(openOrdersService: OpenOrdersService);
    create(createOpenOrderDto: CreateOpenOrderDto): Promise<{
        instrument_id: number;
        customer_id: number;
        market_type: string;
        buy_qty: number;
        buy_price: number;
        buy_date: string;
        order_id: number;
    }>;
    findAll(marketType: string): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    update(id: string, updateOpenOrderDto: UpdateOpenOrderDto): Promise<{
        instrument_id?: number | undefined;
        customer_id?: number | undefined;
        market_type?: string | undefined;
        buy_qty?: number | undefined;
        buy_price?: number | undefined;
        buy_date?: string | undefined;
        order_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
