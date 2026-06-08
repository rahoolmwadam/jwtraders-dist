"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenOrdersService = void 0;
const common_1 = require("@nestjs/common");
const queries_1 = require("../db/queries");
const pool_1 = require("../db/pool");
let OpenOrdersService = class OpenOrdersService {
    async create(dto) {
        const { instrument_id, buy_qty, buy_price, buy_date, market_type, customer_id } = dto;
        const [result] = await pool_1.pool.query(queries_1.queries.CREATE_OPEN_ORDER, [
            instrument_id, market_type, buy_date, buy_qty, buy_price, customer_id
        ]);
        return { order_id: result.insertId, ...dto };
    }
    async findAll(marketType) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_OPEN_ORDERS, [marketType]);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_OPEN_ORDER_BY_ID, [id]);
        return rows[0];
    }
    async update(id, dto) {
        const { instrument_id, buy_qty, buy_price, buy_date, market_type, customer_id } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_OPEN_ORDER, [
            instrument_id, market_type, buy_date, buy_qty, buy_price, customer_id, id
        ]);
        return { order_id: id, ...dto };
    }
    async remove(id) {
        await pool_1.pool.query(queries_1.queries.DELETE_OPEN_ORDER, [id]);
        return { deleted: true };
    }
};
exports.OpenOrdersService = OpenOrdersService;
exports.OpenOrdersService = OpenOrdersService = __decorate([
    (0, common_1.Injectable)()
], OpenOrdersService);
//# sourceMappingURL=open_orders.service.js.map