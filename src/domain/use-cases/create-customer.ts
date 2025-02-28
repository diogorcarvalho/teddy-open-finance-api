import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";
import { Customer } from "../entities/customer";

@Injectable()
export class CreateCustomer {
    constructor(
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) {}

    async execAsync({ name, salary, companyValue }: Input): Promise<any> {
        const customer = await this.repo.findByName(name);

        if (customer) {
            throw new BadRequestException('Já existem um cliente cadastrado com esse nome');
        }

        await this.repo.create(Customer.create(name, salary, companyValue, false));
        return { message: 'Novo cliente registrado com sucesso' };
    }
}

export type Input = {
    name: string;
    salary: number;
    companyValue: number;
};
