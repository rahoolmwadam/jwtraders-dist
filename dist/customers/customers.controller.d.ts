import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InvestmentsService } from "../investments/investments.service";
export declare class CustomersController {
    private readonly customersService;
    private readonly investmentsService;
    constructor(customersService: CustomersService, investmentsService: InvestmentsService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        name: string;
        email: string;
        address?: string;
        status: "active" | "inactive" | "suspended";
        kyc_status: "pending" | "verified" | "rejected";
        customer_id: number;
    }>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findLoanCustomers(): Promise<import("mysql2").QueryResult>;
    findInvestments(id: number): Promise<{
        customer_id: any;
        name: any;
        email: any;
        address: any;
        status: any;
        kyc_status: any;
        investments: any;
    } | null>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<{
        name?: string | undefined;
        email?: string | undefined;
        address?: string | undefined;
        status?: "active" | "inactive" | "suspended" | undefined;
        kyc_status?: "pending" | "verified" | "rejected" | undefined;
        customer_id: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
