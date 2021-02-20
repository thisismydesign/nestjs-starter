import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from 'src/companies/company.entity';
import { Order } from 'src/orders/order.entity';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  budget: number;

  @Field((_type) => Company)
  @ManyToOne((_type) => Company, (company) => company.employees)
  company: Company;

  @Field((_type) => [Order], { nullable: 'items' })
  @OneToMany((_type) => Order, (order) => order.employee)
  orders?: Order[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
