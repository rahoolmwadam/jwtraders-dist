"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
let CustomersService = class CustomersService {
    async create(dto) {
        const { name, email, address, status, kyc_status } = dto;
        const [result] = await pool_1.pool.query(queries_1.queries.CREATE_CUSTOMER, [
            name, email, address, status, kyc_status,
        ]);
        return { customer_id: result.insertId, ...dto };
    }
    async findAll() {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMERS);
        return rows;
    }
    async findLoanCustomers() {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_LOAN_CUSTOMERS);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_BY_ID, [id]);
        return rows[0];
    }
    async update(id, dto) {
        const { name, email, address, status, kyc_status } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_CUSTOMER, [
            name, email, address, status, kyc_status, id,
        ]);
        return { customer_id: id, ...dto };
    }
    async remove(id) {
        await pool_1.pool.query(queries_1.queries.DELETE_CUSTOMER, [id]);
        return { deleted: true };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)()
], CustomersService);
//# sourceMappingURL=customers.service.js.map