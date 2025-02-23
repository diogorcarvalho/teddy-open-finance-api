import { BadRequestException } from "@nestjs/common";
import { v4 } from "uuid";

export class Customer {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly salary: number,
        readonly companyValue: number,
        readonly createAt: Date,
        readonly updateAt: Date,
    ) { }

    update(name: string, salary: number, companyValue: number): Customer {
        if (!Customer.validName(name)) {
            throw new BadRequestException('Nome do cliente é inválido');
        }

        if (!Customer.validateFinancialValue(salary)) {
            throw new BadRequestException('Salário do cliente é inválido');
        }

        if (!Customer.validateFinancialValue(salary)) {
            throw new BadRequestException('Valor da emrpesa é inválido');
        }
        
        const date = new Date();
        return new Customer(this.id, name.trim(), salary, companyValue, this.createAt, date);
    }

    static validName(name: string): boolean {
        if (name && name.trim().length > 2) return true;
        return false;
    }

    static validateFinancialValue(value: number): boolean {
        if (value && value >= 0) return true;
        return false;
    }

    static create(name: string, salary: number, companyValue: number): Customer {
        if (!this.validName(name)) {
            throw new BadRequestException('Nome do cliente é inválido');
        }

        if (!this.validateFinancialValue(salary)) {
            throw new BadRequestException('Salário do cliente é inválido');
        }

        if (!this.validateFinancialValue(salary)) {
            throw new BadRequestException('Valor da emrpesa é inválido');
        }

        const date = new Date();
        return new Customer(v4(), name.trim(), salary, companyValue, date, date);
    }
}
