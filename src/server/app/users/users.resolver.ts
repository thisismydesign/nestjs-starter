import { Resolver, Query, Field, ObjectType } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/gql-auth.decorator';

@ObjectType()
class User {
  @Field()
  userId: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver((_of) => User)
export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Query((_returns) => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findById(user.userId);
  }
}
