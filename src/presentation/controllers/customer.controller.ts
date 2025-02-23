import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/domain/entities/customer";
import { CustomerRepository } from "src/domain/repositories/customer-repository";
import { CreateCustomer } from "src/domain/use-cases/create-customer";
import { DeleteCustomer } from "src/domain/use-cases/delete-customer";
import { UpdateCustomer } from "src/domain/use-cases/update-customer";

export class CreateCustomerRequest {
    @ApiProperty()
    name: string;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    companyValue: number;
}

export class UpdateustomerRequest {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    companyValue: number;
}

@Controller('customers')
export class CustomerController {
    constructor(
        private readonly createCustomer: CreateCustomer,
        private readonly updateCustomer: UpdateCustomer,
        private readonly deleteCustomer: DeleteCustomer,
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() input: CreateCustomerRequest): Promise<any> {
        return await this.createCustomer.execAsync(input);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<Customer[]> {
        return await this.repo.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getBy(@Param('id') id: string): Promise<Customer> {
        const customer = await this.repo.findById(id);
        if (!customer) throw new NotFoundException(`Não foi cadastrado o cliente do ID informado`);
        return customer;
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async update(@Body() input: UpdateustomerRequest): Promise<any> {
        return await this.updateCustomer.execAsync(input);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string): Promise<any> {
        await this.deleteCustomer.execAsync({ id });
        return { message: `Cliente removido com sucesso` };
    }
}
