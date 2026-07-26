import { CreateOpenOrderDto } from './dto/create-open_order.dto';
import { UpdateOpenOrderDto } from './dto/update-open_order.dto';
export declare class OpenOrdersService {
    create(dto: CreateOpenOrderDto): Promise<{
        instrument_id: number;
        customer_id: number;
        market_type: string;
        buy_qty: number;
        buy_price: number;
        buy_date: string;
        sell_placed: string;
        reserved_placed: string;
        loan_percent: number;
        order_id: number;
    }>;
    findAll(marketType: string): Promise<import("mysql2/promise").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateOpenOrderDto): Promise<{
        instrument_id?: number | undefined;
        customer_id?: number | undefined;
        market_type?: string | undefined;
        buy_qty?: number | undefined;
        buy_price?: number | undefined;
        buy_date?: string | undefined;
        sell_placed?: string | undefined;
        reserved_placed?: string | undefined;
        loan_percent?: number | undefined;
        order_id: number;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
