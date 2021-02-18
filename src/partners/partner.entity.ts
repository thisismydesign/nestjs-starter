import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Voucher } from 'src/vouchers/voucher.entity';

@ObjectType()
@Entity()
export class Partner {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field((_type) => [Voucher], { nullable: 'items' })
  @OneToMany((_type) => Voucher, (voucher) => voucher.partner)
  vouchers?: Voucher[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
