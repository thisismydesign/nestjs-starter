import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Partner } from './partner.entity';
import { PartnersService } from './partners.service';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { OrdersService } from 'src/orders/orders.service';

@Resolver((_of) => Partner)
export class PartnersResolver {
  constructor(
    @Inject(PartnersService) private partnersService: PartnersService,
    @Inject(VouchersService) private vouchersService: VouchersService,
    @Inject(OrdersService) private ordersService: OrdersService,
  ) {}

  @ResolveField()
  async vouchers(@Parent() partner: Partner) {
    return this.vouchersService.findAll({ where: { partner: partner } });
  }

  @ResolveField((_returns) => Number)
  async revenue(@Parent() partner: Partner) {
    return this.vouchersService
      .findAll({ relations: ['orders'], where: { partner: partner } })
      .then((vouchers) => {
        return vouchers.reduce((accumulator, voucher) => {
          return accumulator + voucher.orders.length * voucher.amount;
        }, 0);
      });
  }

  @Query((_returns) => [Partner])
  async partners(): Promise<Partner[]> {
    return this.partnersService.findAll();
  }
}
