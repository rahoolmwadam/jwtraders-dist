export declare class CreateSellOrderDto {
    order_id: number;
    instrument_id: number;
    instrument: string;
    is_average: string;
    customer_id: number | null;
    market_type: string;
    buy_date: string;
    buy_qty: number;
    buy_price: number;
    sell_date: string;
    sell_qty: number;
    sell_price: number;
}
