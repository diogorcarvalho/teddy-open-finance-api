import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateCustomer, Input } from './../src/domain/use-cases/create-customer';
import { CustomerRepository } from './../src/domain/repositories/customer-repository';
import { Customer } from './../src/domain/entities/customer';

describe('CreateCustomer', () => {
  let createCustomer: CreateCustomer;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomer,
        {
          provide: 'CustomerRepository',
          useValue: {
            findByName: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createCustomer = module.get<CreateCustomer>(CreateCustomer);
    customerRepository = module.get<CustomerRepository>('CustomerRepository');
  });

  it('deve ser definido', () => {
    expect(createCustomer).toBeDefined();
  });

  it('deve criar um novo cliente quando o nome for único', async () => {
    const input: Input = { name: 'João da Silva', salary: 5000, companyValue: 10000 };
    jest.spyOn(customerRepository, 'findByName').mockResolvedValue(null);
    jest.spyOn(customerRepository, 'create').mockResolvedValue(undefined);

    await expect(createCustomer.execAsync(input)).resolves.toEqual({
      message: 'Novo cliente registrado com sucesso',
    });

    expect(customerRepository.findByName).toHaveBeenCalledWith('João da Silva');
    expect(customerRepository.create).toHaveBeenCalledWith(
      expect.any(Customer)
    );
  });

  it('deve lançar BadRequestException se existir um cliente com o mesmo nome', async () => {
    const input: Input = { name: 'João da Silva', salary: 5000, companyValue: 10000 };
    const existingCustomer = Customer.create('João da Silva', 5000, 10000);
    jest.spyOn(customerRepository, 'findByName').mockResolvedValue(existingCustomer);

    await expect(createCustomer.execAsync(input)).rejects.toThrow(
      new BadRequestException('Já existem um cliente cadastrado com esse nome')
    );

    expect(customerRepository.findByName).toHaveBeenCalledWith('João da Silva');
    expect(customerRepository.create).not.toHaveBeenCalled();
  });
});
