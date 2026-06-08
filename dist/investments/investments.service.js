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
exports.InvestmentsService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
const auth_service_1 = require("../auth/auth.service");
let InvestmentsService = class InvestmentsService {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async create(dto) {
        const { customer_id, amount, date } = dto;
        const [result] = await pool_1.pool.query(queries_1.queries.CREATE_INVESTMENT, [
            customer_id, amount, date,
        ]);
        return { investment_id: result.insertId, ...dto };
    }
    async findAll(user) {
        const { email, isAdmin } = this.auth.getUser(user);
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_INVESTMENTS, [email, isAdmin]);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_INVESTMENT_BY_ID, [id]);
        return rows[0];
    }
    async update(id, dto) {
        const { customer_id, amount, date } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_INVESTMENT, [
            customer_id, amount, date, id,
        ]);
        return { investment_id: id, ...dto };
    }
    async remove(id) {
        await pool_1.pool.query(queries_1.queries.DELETE_INVESTMENT, [id]);
        return { deleted: true };
    }
    async findByCustomer(customerId) {
        const [rows] = await pool_1.pool.query('SELECT * FROM Investments WHERE customer_id = ?', [customerId]);
        return rows;
    }
    async getBalances(user) {
        const { email, isAdmin } = this.auth.getUser(user);
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_INVESTMENT_BALANCES, [email, isAdmin]);
        return rows[0];
    }
    async findCustomerWithInvestments(customerId) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_INVESTMENT, [customerId]);
        if (rows.length === 0)
            return null;
        const customer = {
            customer_id: rows[0].customer_id,
            name: rows[0].name,
            email: rows[0].email,
            address: rows[0].address,
            status: rows[0].status,
            kyc_status: rows[0].kyc_status,
            investments: rows
                .filter(r => r.investment_id !== null)
                .map(r => ({
                investment_id: r.investment_id,
                amount: r.amount,
                date: r.date,
            })),
        };
        return customer;
    }
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map