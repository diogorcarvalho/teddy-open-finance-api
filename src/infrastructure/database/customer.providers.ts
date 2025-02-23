import { DataSource } from 'typeorm';
import { CustomerModel } from './customer.model';

export const customerProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CustomerModel),
        inject: ['DATA_SOURCE'],
    },
];
