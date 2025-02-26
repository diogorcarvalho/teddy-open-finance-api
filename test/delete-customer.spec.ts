import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteCustomer } from './../src/domain/use-cases/delete-customer';
import { CustomerRepository } from './../src/domain/repositories/customer-repository';
import { Customer } from './../src/domain/entities/customer';

describe('DeleteCustomer', () => {
    let deleteCustomer: DeleteCustomer;
    let customerRepository: CustomerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCustomer,
                {
                    provide: 'CustomerRepository',
                    useValue: {
                        findById: jest.fn(),
                        delete: jest.fn(),
                    }
                },
            ],
        }).compile();

        deleteCustomer = module.get<DeleteCustomer>(DeleteCustomer);
        customerRepository = module.get<CustomerRepository>('CustomerRepository');
    });

    it('deve ser definido', () => {
        expect(deleteCustomer).toBeDefined();
    });

    it('deve lançar NotFoundException se o cliente não for encontrado', async () => {
        const input = { id: '123' };

        // Simulando que o cliente não existe
        jest.spyOn(customerRepository, 'findById').mockRejectedValue(null);

        await expect(deleteCustomer.execAsync(input)).rejects.toThrowError(
            new NotFoundException('Não existe esse cliente cadastrado'),
        );
    });

    it('deve retornar mensagem de sucesso se o cliente for excluído', async () => {
        const input = { id: '123' };
        const existingCustomer = Customer.create('João da Silva', 5000, 10000);

        // Simulando que o cliente foi encontrado
        jest.spyOn(customerRepository, 'findById').mockResolvedValue(existingCustomer);
        jest.spyOn(customerRepository, 'delete').mockResolvedValue(true);

        const result = await deleteCustomer.execAsync(input);

        expect(result).toEqual({ message: 'Cliente removido com sucesso' });
        expect(customerRepository.findById).toHaveBeenCalledWith(input.id);
        expect(customerRepository.delete).toHaveBeenCalledWith(input.id);
    });
});
