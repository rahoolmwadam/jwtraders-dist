import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { AuthService } from "../auth/auth.service";
export declare class LoansService {
    private auth;
    constructor(auth: AuthService);
    create(dto: CreateLoanDto): Promise<{
        customer_id: number;
        amount: number;
        date: string;
        loan_id: number;
    }>;
    findAll(user: any): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateLoanDto): Promise<{
        customer_id?: number | undefined;
        amount?: number | undefined;
        date?: string | undefined;
        loan_id: number;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    getBalances(user: any): Promise<any>;
    getLoanOrders(user: any): Promise<import("mysql2").QueryResult>;
    getTotalLoanOrders(user: any): Promise<import("mysql2").QueryResult>;
    getCustomerTotalLoanOrders(user: any): Promise<import("mysql2").QueryResult>;
    getCustomerTotalLoanSellOrders(user: any): Promise<import("mysql2").QueryResult>;
}
