import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { Customer } from "src/domain/entities/customer";
import { CustomerRepository } from "src/domain/repositories/customer-repository";
import { CreateCustomer } from "src/domain/use-cases/create-customer";
import { DeleteCustomer } from "src/domain/use-cases/delete-customer";
import { SelectCustomer } from "src/domain/use-cases/select-customer";
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

    @ApiProperty()
    selected: boolean;
}

export class SelectItemRequest {
    @ApiProperty()
    id: string;

    @ApiProperty()
    select: boolean;
}

@Controller('customers')
export class CustomerController {
    constructor(
        private readonly createCustomer: CreateCustomer,
        private readonly updateCustomer: UpdateCustomer,
        private readonly deleteCustomer: DeleteCustomer,
        private readonly selectCustomer: SelectCustomer,
        @Inject('CustomerRepository') private readonly repo: CustomerRepository,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() input: CreateCustomerRequest): Promise<any> {
        return await this.createCustomer.execAsync(input);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'selected', required: true })
    async getAll(@Query('selected') selected: boolean): Promise<Customer[]> {
        return await this.repo.findAll(selected);
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

    @Patch('select')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: [SelectItemRequest] })
    async select(@Body() itens: SelectItemRequest[]): Promise<any> {
        return await this.selectCustomer.execAsync(itens);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string): Promise<any> {
        return await this.deleteCustomer.execAsync({ id });
    }
}
