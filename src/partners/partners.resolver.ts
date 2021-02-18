import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Partner } from './partner.entity';
import { PartnersService } from './partners.service';
import { VouchersService } from 'src/vouchers/vouchers.service';

@Resolver((_of) => Partner)
export class PartnersResolver {
  constructor(
    @Inject(PartnersService) private partnersService: PartnersService,
    @Inject(VouchersService) private vouchersService: VouchersService,
  ) {}

  @ResolveField()
  async vouchers(@Parent() partner: Partner) {
    return this.vouchersService.findAll({ where: { partner: partner } });
  }

  @Query((_returns) => [Partner])
  async partners(): Promise<Partner[]> {
    return this.partnersService.findAll();
  }
}
