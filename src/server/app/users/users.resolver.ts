import { Resolver, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver((_of) => User)
export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Query((_returns) => [User])
  @UseGuards(GqlAuthGuard)
  async users(params: FindManyOptions<User> = {}): Promise<User[]> {
    return this.usersService.findAll(params);
  }
}
