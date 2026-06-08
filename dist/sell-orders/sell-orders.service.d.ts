import { InstrumentsService } from "../instruments/instruments.service";
import { OpenOrdersService } from "../open_orders/open_orders.service";
import { SystemParametersService } from "../system-parameters/system-parameters.service";
import { CreateSellOrderDto } from './dto/create-sell-order.dto';
import { UpdateSellOrderDto } from './dto/update-sell-order.dto';
export declare class SellOrdersService {
    protected openOrderService: OpenOrdersService;
    protected systemParametersService: SystemParametersService;
    protected readonly instrumentService: InstrumentsService;
    constructor(openOrderService: OpenOrdersService, systemParametersService: SystemParametersService, instrumentService: InstrumentsService);
    create(dto: CreateSellOrderDto): Promise<any>;
    findAll(marketType: any): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateSellOrderDto): Promise<{
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
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    batchCreate(orders: CreateSellOrderDto[]): Promise<number[]>;
    averageCreate(orders: CreateSellOrderDto[]): Promise<number[]>;
    handleCustomerProfits(sellOrderIds: number[]): Promise<void>;
}
