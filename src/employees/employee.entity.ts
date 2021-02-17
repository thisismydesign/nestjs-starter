import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from 'src/companies/company.entity';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field((_type) => Company)
  @ManyToOne((_type) => Company, (company) => company.employees)
  company: Company;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
