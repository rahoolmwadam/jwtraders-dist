import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { AuthService } from "../auth/auth.service";
export declare class InvestmentsService {
    private auth;
    constructor(auth: AuthService);
    create(dto: CreateInvestmentDto): Promise<{
        customer_id: number;
        amount: number;
        date: string;
        investment_id: number;
    }>;
    findAll(user: any): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateInvestmentDto): Promise<{
        customer_id?: number | undefined;
        amount?: number | undefined;
        date?: string | undefined;
        investment_id: number;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    findByCustomer(customerId: number): Promise<import("mysql2").QueryResult>;
    getBalances(user: any): Promise<any>;
    findCustomerWithInvestments(customerId: number): Promise<{
        customer_id: any;
        name: any;
        email: any;
        address: any;
        status: any;
        kyc_status: any;
        investments: any;
    } | null>;
}
