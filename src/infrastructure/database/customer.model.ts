import { Customer } from "src/domain/entities/customer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'customers' })
export class CustomerModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column('float', { nullable: false })
    salary: number;

    @Column('float', { nullable: false })
    companyValue: number;

    @Column('boolean', { nullable: false, default: false })
    selected: boolean;

    @Column('timestamptz')
    createAt: Date;

    @Column('timestamptz')
    updateAt: Date;
}

export function modelToEntity(model: CustomerModel): Customer {
    return new Customer(model.id, model.name, model.salary, model.companyValue, model.selected, model.createAt, model.updateAt);
}
