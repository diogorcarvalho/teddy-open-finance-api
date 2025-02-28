import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";

@Injectable()
export class UpdateCustomer {
    constructor(
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) {}

    async execAsync({ id, name, salary, companyValue, selected }): Promise<any> {
        const customer = await this.repo.findById(id);

        if (!customer) {
            throw new BadRequestException('ID informado não está registrado no banco de dados');
        }

        const customerUpdated = customer.update(name, salary, companyValue, selected);
        await this.repo.update(customerUpdated);
        return { message: 'Cliente foi atualizado com sucesso' };
    }
}

export type Input = {
    id: string;
    name: string;
    salary: number;
    companyValue: number;
    selected: boolean;
};
