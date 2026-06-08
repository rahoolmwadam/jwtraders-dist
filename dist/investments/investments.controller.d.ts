import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
export declare class InvestmentsController {
    private readonly investmentsService;
    constructor(investmentsService: InvestmentsService);
    create(createInvestmentDto: CreateInvestmentDto): Promise<{
        customer_id: number;
        amount: number;
        date: string;
        investment_id: number;
    }>;
    findAll(req: Request): Promise<import("mysql2").QueryResult>;
    getBalances(req: Request): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<{
        customer_id?: number | undefined;
        amount?: number | undefined;
        date?: string | undefined;
        investment_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
