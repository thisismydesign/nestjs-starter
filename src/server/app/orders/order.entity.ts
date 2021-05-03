import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Thing } from '../things/thing.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  alias: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.orders, { nullable: false })
  user: User;

  @Field((_type) => Thing)
  @ManyToOne((_type) => Thing, (thing) => thing.orders, { nullable: false })
  thing: Thing;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
