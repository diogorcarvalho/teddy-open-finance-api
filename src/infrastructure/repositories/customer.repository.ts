import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel, modelToEntity } from '../database/customer.model';
import { Customer } from 'src/domain/entities/customer';
import { CustomerRepository } from 'src/domain/repositories/customer-repository';

@Injectable()
export class CustomerRepositoryPostgres implements CustomerRepository {
    constructor(
        @Inject('CUSTOMER_REPOSITORY') private readonly repository: Repository<CustomerModel>,
    ) { }

    async create(customer: Customer): Promise<void> {
        const newCustomer = this.repository.create(customer);
        await this.repository.save(newCustomer);
    }

    async findById(id: string): Promise<Customer | null> {
        const model = await this.repository.findOne({ where: { id } });
        if (model) return modelToEntity(model);
        return null;
    }

    async findByName(name: string): Promise<Customer | null> {
        const model = await this.repository.findOne({ where: { name } });
        if (model) return modelToEntity(model);
        return null;
    }

    async findAll(selected: boolean): Promise<Customer[]> {
        const models = await this.repository.find({ where: { selected } });
        return models.map((model) => modelToEntity(model));
    }

    async update(customer: Customer): Promise<void> {
        await this.repository.update(customer.id, customer);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected! > 0;
    }
}
