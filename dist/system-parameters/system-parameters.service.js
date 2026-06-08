"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemParametersService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
let SystemParametersService = class SystemParametersService {
    create(dto) {
        return 'This action adds a new systemParameter';
    }
    async findAll() {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_SYS_PARAMS);
        return rows;
    }
    async findOne(id) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_SYS_PARAMS_BY_ID, [id]);
        return rows[0];
    }
    async findByMarket(marketType) {
        const [rows] = await pool_1.pool.query(queries_1.queries.GET_SYS_PARAMS_BY_MARKET, [marketType]);
        return rows[0];
    }
    async update(id, dto) {
        const { brokerage, charges, tax_percent, usd_value } = dto;
        await pool_1.pool.query(queries_1.queries.UPDATE_SYS_PARAMS, [
            brokerage, charges, tax_percent, usd_value, id
        ]);
        return { system_params_id: id, ...dto };
    }
    remove(id) {
        return `This action removes a #${id} systemParameter`;
    }
};
exports.SystemParametersService = SystemParametersService;
exports.SystemParametersService = SystemParametersService = __decorate([
    (0, common_1.Injectable)()
], SystemParametersService);
//# sourceMappingURL=system-parameters.service.js.map