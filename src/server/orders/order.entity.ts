import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Voucher } from 'src/server/vouchers/voucher.entity';
import { Employee } from 'src/server/employees/employee.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ nullable: false })
  date: Date;

  @Field((_type) => Voucher)
  @ManyToOne((_type) => Voucher, (voucher) => voucher.orders)
  voucher: Voucher;

  @Field((_type) => Employee)
  @ManyToOne((_type) => Employee, (employee) => employee.orders)
  employee: Employee;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
