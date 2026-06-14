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
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
const auth_service_1 = require("../auth/auth.service");
let LoansService = class LoansService {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async create(dto) {
        const { customer_id, amount, date } = dto;
        const [result] = await pool_1.pool.query(queries_1.queries.CREATE_LOAN, [
            customer_id, amount, date,
        ]);
        return { loan_id: result.insertId, ...dto };
    }
    async findAll(user) {
        const { isAdmin, email } = this.auth.getUser(user);
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_LOANS, [email, isAdmin]);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_LOAN_BY_ID, [id]);
        return rows[0];
    }
    async update(id, dto) {
        const { customer_id, amount, date } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_LOAN, [
            customer_id, amount, date, id,
        ]);
        return { loan_id: id, ...dto };
    }
    async remove(id) {
        await pool_1.pool.query(queries_1.queries.DELETE_LOAN, [id]);
        return { deleted: true };
    }
    async getBalances(user) {
        const { isAdmin, email } = this.auth.getUser(user);
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_LOAN_BALANCES, [email, isAdmin]);
        return rows[0];
    }
    async getLoanOrders(user) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_LOAN_ORDERS);
        return rows;
    }
    async getTotalLoanOrders(user) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_TOTAL_LOAN_ORDERS);
        return rows;
    }
    async getCustomerTotalLoanOrders(user) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_LOAN_TOTAL_ORDERS);
        return rows;
    }
    async getCustomerTotalLoanSellOrders(user) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_LOAN_SELL_TOTAL_ORDERS);
        return rows;
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoansService);
//# sourceMappingURL=loans.service.js.map