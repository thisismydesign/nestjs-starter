import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Voucher } from './voucher.entity';
import { VouchersService } from './vouchers.service';
import { PartnersService } from 'src/partners/partners.service';
import { OrdersService } from 'src/orders/orders.service';

@Resolver((_of) => Voucher)
export class VouchersResolver {
  constructor(
    @Inject(VouchersService) private vouchersService: VouchersService,
    @Inject(PartnersService) private partnersService: PartnersService,
    @Inject(OrdersService) private ordersService: OrdersService,
  ) {}

  @ResolveField()
  async partner(@Parent() voucher: Voucher) {
    return this.partnersService.findOne(voucher.partner.id);
  }

  @ResolveField()
  async orders(@Parent() voucher: Voucher) {
    return this.ordersService.findAll({ where: { voucher: voucher } });
  }

  @Query((_returns) => [Voucher])
  async vouchers(): Promise<Voucher[]> {
    return this.vouchersService.findAll();
  }
}
