"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellOrdersService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
const instruments_service_1 = require("../instruments/instruments.service");
const open_orders_service_1 = require("../open_orders/open_orders.service");
const system_parameters_service_1 = require("../system-parameters/system-parameters.service");
let SellOrdersService = class SellOrdersService {
    openOrderService;
    systemParametersService;
    instrumentService;
    constructor(openOrderService, systemParametersService, instrumentService) {
        this.openOrderService = openOrderService;
        this.systemParametersService = systemParametersService;
        this.instrumentService = instrumentService;
    }
    async create(dto) {
        const { order_id, instrument_id, buy_qty, buy_price, buy_date, market_type, customer_id, sell_price, sell_qty, sell_date } = dto;
        let queryParams = [
            instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date
        ];
        const systemParams = await this.systemParametersService.findByMarket(market_type);
        if (systemParams) {
            const { brokerage, charges, tax_percent, usd_value } = systemParams;
            queryParams = [...queryParams, brokerage, charges, tax_percent, usd_value];
        }
        const [result] = await pool_1.pool.query(queries_1.queries.CREATE_SELL_ORDER, queryParams);
        if (result.insertId && order_id) {
            await pool_1.pool.query(queries_1.queries.DELETE_OPEN_ORDER, [order_id]);
        }
        const row = { sell_order_id: result.insertId, ...dto };
        await this.handleCustomerProfits([row.sell_order_id]);
        return row;
    }
    async findAll(marketType) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_SELL_ORDERS, [marketType]);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_SELL_ORDER_BY_ID, [id]);
        return rows[0];
    }
    async update(id, dto) {
        const { instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_SELL_ORDER, [
            instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, id
        ]);
        return { sell_order_id: id, ...dto };
    }
    async remove(id) {
        await pool_1.pool.query(queries_1.queries.DELETE_OPEN_ORDER, [id]);
        return { deleted: true };
    }
    async batchCreate(orders) {
        const systemParams = await this.systemParametersService.findByMarket(orders[0].market_type);
        const { brokerage, charges, tax_percent, usd_value } = systemParams;
        const instruments = await this.instrumentService.findAll();
        const instrumentMap = {};
        for (let instrument of instruments) {
            instrumentMap[instrument.instrument_name] = instrument.instrument_id;
        }
        const data = orders.map(order => {
            let { instrument_id, instrument, buy_qty, buy_price, buy_date, market_type, customer_id, sell_price, sell_date, is_average } = order;
            let sell_qty = buy_qty;
            instrument_id = instrument_id ? instrument_id : instrumentMap[instrument];
            is_average = is_average ? is_average : 'N';
            customer_id = customer_id ? customer_id : null;
            let queryParams = [
                instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, is_average
            ];
            queryParams = [...queryParams, brokerage, charges, tax_percent, usd_value];
            return [
                ...queryParams
            ];
        });
        const [result] = await pool_1.pool.query(queries_1.queries.BATCH_CREATE_SELL, [data]);
        const firstId = result.insertId;
        const totalInserted = result.affectedRows;
        const allInsertIds = Array.from({ length: totalInserted }, (_, index) => firstId + index);
        this.handleCustomerProfits(allInsertIds);
        return allInsertIds;
    }
    async averageCreate(orders) {
        const allInsertIds = await this.batchCreate(orders);
        await pool_1.pool.query(queries_1.queries.BULK_DELETE_OPEN_ORDER, [orders.map(o => o.order_id).filter(id => id)]);
        await this.handleCustomerProfits(allInsertIds);
        return allInsertIds;
    }
    async handleCustomerProfits(sellOrderIds) {
        const [orders] = await pool_1.pool.query(queries_1.queries.GET_BULK_SELL_ORDER_BY_ID, [sellOrderIds]);
        const [customerContributions] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_CONTRIB, []);
        const customerContribMap = {};
        for (let contrib of customerContributions) {
            customerContribMap[contrib.customer_id] = contrib.contribution;
        }
        const customerProfitsData = [];
        for (let order of orders) {
            let net_profit = order.net_profit;
            if (['us', 'crypto'].includes(order.market_type)) {
                net_profit = net_profit * order.usd_value;
            }
            if (order.customer_id) {
                let loan_profit = net_profit * 0.5;
                net_profit = net_profit - loan_profit;
                customerProfitsData.push([order.customer_id, loan_profit, order.sell_date, order.sell_order_id]);
            }
            for (let customer_id in customerContribMap) {
                const profit = (net_profit * customerContribMap[customer_id]).toFixed(10);
                customerProfitsData.push([customer_id, profit, order.sell_date, order.sell_order_id]);
            }
        }
        const [result] = await pool_1.pool.query(queries_1.queries.BULK_INSERT_CUSTOMER_PROFITS, [customerProfitsData]);
    }
};
exports.SellOrdersService = SellOrdersService;
exports.SellOrdersService = SellOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [open_orders_service_1.OpenOrdersService,
        system_parameters_service_1.SystemParametersService,
        instruments_service_1.InstrumentsService])
], SellOrdersService);
//# sourceMappingURL=sell-orders.service.js.map