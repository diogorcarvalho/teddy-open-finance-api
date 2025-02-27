import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from './../src/domain/repositories/customer-repository';
import { BadRequestException } from '@nestjs/common';
import { UpdateCustomer } from './../src/domain/use-cases/update-customer';
import { Customer } from './../src/domain/entities/customer';

describe('UpdateCustomer', () => {
    let updateCustomer: UpdateCustomer;
    let customerRepository: CustomerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCustomer,
                {
                    provide: 'CustomerRepository',
                    useValue: {
                        findById: jest.fn(),
                        update: jest.fn(),
                    }
                },
            ],
        }).compile();

        updateCustomer = module.get<UpdateCustomer>(UpdateCustomer);
        customerRepository = module.get<CustomerRepository>('CustomerRepository');
    });

    it('deve ser definido', () => {
        expect(updateCustomer).toBeDefined();
    });

    it('deve lançar BadRequestException se o cliente não for encontrado', async () => {
        const input = { id: '123', name: 'John Doe', salary: 1000, companyValue: 50000 };

        // Simulando que o cliente não existe
        jest.spyOn(customerRepository, 'findById').mockRejectedValue(null);

        await expect(updateCustomer.execAsync(input)).rejects.toThrowError(
            new BadRequestException('ID informado não está registrado no banco de dados'),
        );
    });

    it('should return success message if customer is updated', async () => {
        const input = { id: '123', name: 'John Doe', salary: 1000, companyValue: 50000 };
        const existingCustomer = Customer.create('João da Silva', 5000, 10000);

        // Simulando que o cliente foi encontrado
        jest.spyOn(customerRepository, 'findById').mockResolvedValue(existingCustomer);
        jest.spyOn(customerRepository, 'update').mockResolvedValue();

        const result = await updateCustomer.execAsync(input);

        expect(result).toEqual({ message: 'Cliente foi atualizado com sucesso' });
        expect(customerRepository.findById).toHaveBeenCalledWith(input.id);
    });
});
