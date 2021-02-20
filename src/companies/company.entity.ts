import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from 'src/employees/employee.entity';

@ObjectType()
@Entity()
export class Company {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field((_type) => [Employee], { nullable: 'items' })
  @OneToMany((_type) => Employee, (employee) => employee.company)
  employees?: Employee[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
