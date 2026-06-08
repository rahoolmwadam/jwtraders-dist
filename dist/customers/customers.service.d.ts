import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersService {
    create(dto: CreateCustomerDto): Promise<{
        name: string;
        email: string;
        address?: string;
        status: "active" | "inactive" | "suspended";
        kyc_status: "pending" | "verified" | "rejected";
        customer_id: number;
    }>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findLoanCustomers(): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateCustomerDto): Promise<{
        name?: string | undefined;
        email?: string | undefined;
        address?: string | undefined;
        status?: "active" | "inactive" | "suspended" | undefined;
        kyc_status?: "pending" | "verified" | "rejected" | undefined;
        customer_id: number;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
