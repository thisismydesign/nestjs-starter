import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { EmployeeModel } from '../employees/employee.model';

@ObjectType()
@Entity()
export class Company {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  // @Field((type) => [EmployeeModel], { nullable: true })
  // @OneToMany((type) => EmployeeModel, (employee) => employee.company)
  // employees?: EmployeeModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
