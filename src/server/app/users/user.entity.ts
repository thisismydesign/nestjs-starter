import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

export type Provider = 'google' | 'local';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  provider: Provider;

  @Field()
  @Column({ nullable: false })
  providerId: string;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
