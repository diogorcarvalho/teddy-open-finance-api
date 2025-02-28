import { Customer } from "../entities/customer";

export interface CustomerRepository {
    create(customer: Partial<Customer>): Promise<void>;
    findById(id: string): Promise<Customer | null>;
    findByName(id: string): Promise<Customer | null>;
    findAll(selected: boolean): Promise<Customer[]>;
    update(customer: Customer): Promise<void>;
    delete(id: string): Promise<boolean>;
}