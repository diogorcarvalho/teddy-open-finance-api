import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";

@Injectable()
export class UpdateCustomer {
    constructor(
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) {}

    async execAsync({ id, name, salary, companyValue }): Promise<any> {
        const customer = await this.repo.findById(id);

        if (!customer) {
            throw new BadRequestException('Não existe esse cadastrado esse cliente informado');
        }

        const customerUpdated = customer.update(name, salary, companyValue);
        await this.repo.update(customerUpdated);
        return { message: 'Cliene foi atualizado com sucesso' };
    }
}

export type Input = {
    id: string;
    name: string;
    salary: number;
    companyValue: number;
};
