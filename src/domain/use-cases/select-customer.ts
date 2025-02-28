import { Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";

@Injectable()
export class SelectCustomer {
    constructor(
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) { }

    async execAsync(itens: Input[]): Promise<any> {
        const errorIds: string[] = [];

        for (const item of itens) {
            const customer = await this.repo.findById(item.id);

            if (customer) {
                const customerUpdated = customer.toggleSelected(item.select);
                await this.repo.update(customerUpdated);
            } else {
                errorIds.push(item.id);
            }
        }

        if (errorIds.length > 0) {
            return { message: `Os seguinte IDs não foram atualizados: ${errorIds.map((id) => `[${id}]`).join(', ')}` };
        } else {
            return { message: `Todos os IDs foram atualizados` };
        }
    }
}

export type Input = {
    id: string;
    select: boolean;
};
