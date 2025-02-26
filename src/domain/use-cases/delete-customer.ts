import { NotFoundException, Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";

@Injectable()
export class DeleteCustomer {
    constructor(
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) { }

    async execAsync({ id }): Promise<any> {
        const customer = await this.repo.findById(id);

        if (!customer) {
            throw new NotFoundException('Não existe esse cliente cadastrado');
        }

        await this.repo.delete(id);
        return { message: 'Cliente removido com sucesso' };
    }
}

export type Input = {
    id: string;
};
