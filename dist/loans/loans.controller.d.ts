import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoansService } from './loans.service';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    create(createLoanDto: CreateLoanDto): Promise<{
        customer_id: number;
        amount: number;
        date: string;
        loan_id: number;
    }>;
    findAll(req: Request): Promise<import("mysql2").QueryResult>;
    getBalances(req: Request): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateLoanDto: UpdateLoanDto): Promise<{
        customer_id?: number | undefined;
        amount?: number | undefined;
        date?: string | undefined;
        loan_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
