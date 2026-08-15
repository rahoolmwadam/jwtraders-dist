import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    findAll(): Promise<import("mysql2").QueryResult>;
    findMain(): Promise<any>;
    findScreener(): Promise<any>;
    findCustomerProfits(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsMonthly(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsDaily(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsQuarterly(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsYearly(type: string): Promise<import("mysql2").QueryResult>;
    getCustomerProfits(req: Request, interval: string, type: string): Promise<import("mysql2").QueryResult>;
}
