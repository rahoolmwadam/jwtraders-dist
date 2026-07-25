export declare class DashboardService {
    findAll(): Promise<import("mysql2").QueryResult>;
    findMain(): Promise<any>;
    findCustomerProfits(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsMonthly(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsDaily(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsQuarterly(): Promise<import("mysql2").QueryResult>;
    findCustomerProfitsYearly(): Promise<import("mysql2").QueryResult>;
}
