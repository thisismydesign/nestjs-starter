import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { ThingsService } from '../things/things.service';
import { User } from '../users/user.entity';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Resolver((_of) => Order)
export class OrdersResolver {
  constructor(
    @Inject(OrdersService) private ordersService: OrdersService,
    @Inject(ThingsService) private thingsService: ThingsService,
  ) {}

  @Query((_returns) => [Order])
  @UseGuards(GqlAuthGuard)
  orders(@CurrentUser() user: User) {
    return this.ordersService.findAll({ where: { user: user } });
  }

  @ResolveField()
  thing(@Parent() order: Order) {
    return this.thingsService.findOne({
      where: { id: order.thing.id },
    });
  }

  @Mutation((_returns) => Order)
  @UseGuards(GqlAuthGuard)
  createOrder(
    @CurrentUser() user: User,
    @Args({ name: 'thingName', type: () => String }) thingName: string,
    @Args({ name: 'alias', type: () => String }) alias: string,
  ) {
    return this.ordersService.createFromThingDetails({
      alias: alias,
      user: user,
      thingName: thingName,
    });
  }
}
