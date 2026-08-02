"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const pool_1 = require("../db/pool");
const queries_1 = require("../db/queries");
let DashboardService = class DashboardService {
    async findAll() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_DASHBORAD_DATA);
        return results;
    }
    async findMain() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_DASHBORAD_MAIN_DATA);
        return results[0];
    }
    async findCustomerProfits() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_PROFITS);
        return results;
    }
    async findCustomerProfitsMonthly() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_PROFITS_MONTHLY);
        return results;
    }
    async findCustomerProfitsDaily() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_PROFITS_DAILY);
        return results;
    }
    async findCustomerProfitsQuarterly() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_PROFITS_QUARTERLY);
        return results;
    }
    async findCustomerProfitsYearly() {
        const [results] = await pool_1.pool.query(queries_1.queries.GET_CUSTOMER_PROFITS_YEARLY);
        return results;
    }
    getGroupAndPeriodSql(interval) {
        switch (interval) {
            case 'daily':
                return {
                    selectExpr: `DATE_FORMAT(sell_date, ?)`,
                    params: ['%Y-%m-%d'],
                };
            case 'quarterly':
                return {
                    selectExpr: `DATE_FORMAT(MAKEDATE(YEAR(sell_date), 1) + INTERVAL (QUARTER(sell_date) - 1) QUARTER, '%Y-%m-01')`,
                    params: [],
                };
            case 'yearly':
                return {
                    selectExpr: `DATE_FORMAT(sell_date, ?)`,
                    params: ['%Y-01-01'],
                };
            case 'monthly':
            default:
                return {
                    selectExpr: `DATE_FORMAT(sell_date, ?)`,
                    params: ['%Y-%m-01'],
                };
        }
    }
    async getCustomerProfitsInGroups(interval = 'monthly') {
        const { selectExpr, params } = this.getGroupAndPeriodSql(interval);
        const sql = `
      SELECT 
        ${selectExpr} AS time_period, 
        cp.customer_id, 
        c.name AS customer_name,
        SUM(profit) AS customer_profit
      FROM customer_profits cp 
      left join customers c on cp.customer_id = c.customer_id
      GROUP BY 
        cp.customer_id, 
        ${selectExpr}
      ORDER BY time_period DESC
    `;
        const queryParams = [...params, ...params];
        const [rows] = await pool_1.pool.query(sql, queryParams);
        return rows;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map