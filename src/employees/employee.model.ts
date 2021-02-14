import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from '../companies/company.entity';

@ObjectType()
@Entity()
export class EmployeeModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column('text', { nullable: false })
  email: string;

  // @Field((type) => Company, { nullable: true })
  // @ManyToOne((type) => Company, (company) => company.employees)
  // company: Company;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
