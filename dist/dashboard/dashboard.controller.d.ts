import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    findAll(): Promise<import("mysql2").QueryResult>;
    findMain(): Promise<any>;
}
