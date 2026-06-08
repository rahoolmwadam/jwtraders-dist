export declare class CreateCustomerDto {
    name: string;
    email: string;
    address?: string;
    status: 'active' | 'inactive' | 'suspended';
    kyc_status: 'pending' | 'verified' | 'rejected';
}
