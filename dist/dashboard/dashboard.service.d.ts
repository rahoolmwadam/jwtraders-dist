import { AuthService } from "../auth/auth.service";
export declare class DashboardService {
    private auth;
    constructor(auth: AuthService);
    findAll(): Promise<import("mysql2").QueryResult>;
    findMain(): Promise<any>;
    findScreener(): Promise<any>;
    findCustomerProfits(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsMonthly(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsDaily(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsQuarterly(type: string): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsYearly(type: string): Promise<import("mysql2").QueryResult>;
    private getGroupAndPeriodSql;
    getCustomerProfitsInGroups(interval: string | undefined, isLoan: string | undefined, user: any): Promise<import("mysql2").QueryResult>;
}
