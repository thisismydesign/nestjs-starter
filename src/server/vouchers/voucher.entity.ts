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
import { Partner } from 'src/server/partners/partner.entity';
import { Order } from 'src/server/orders/order.entity';

@ObjectType()
@Entity()
export class Voucher {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ nullable: false })
  amount: number;

  @Field((_type) => Partner)
  @ManyToOne((_type) => Partner, (partner) => partner.vouchers)
  partner: Partner;

  @Field((_type) => [Order], { nullable: 'items' })
  @OneToMany((_type) => Order, (order) => order.voucher)
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
