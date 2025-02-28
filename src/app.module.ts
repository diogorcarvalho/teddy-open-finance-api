import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateCustomer } from './domain/use-cases/create-customer';
import { databaseProviders } from './infrastructure/database/database.providers';
import { customerProviders } from './infrastructure/database/customer.providers';
import { CustomerRepositoryPostgres } from './infrastructure/repositories/customer.repository';
import { CustomerController } from './presentation/controllers/customer.controller';
import { UpdateCustomer } from './domain/use-cases/update-customer';
import { DeleteCustomer } from './domain/use-cases/delete-customer';
import { SelectCustomer } from './domain/use-cases/select-customer';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [
        ...databaseProviders,
        ...customerProviders,
        { provide: 'CustomerRepository', useClass: CustomerRepositoryPostgres },
        CreateCustomer,
        UpdateCustomer,
        DeleteCustomer,
        SelectCustomer,
    ],
    controllers: [CustomerController],
})
export class AppModule { }
