import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VouchersService } from 'src/server/app/vouchers/vouchers.service';
import { FindManyOptions, Repository } from 'typeorm';
import { Partner } from './partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
    @Inject(VouchersService) private vouchersService: VouchersService,
  ) {}

  create(partner: Partner) {
    return this.partnersRepository.save(partner);
  }

  findOne(id: number) {
    return this.partnersRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Partner> = {}) {
    return this.partnersRepository.find(params);
  }

  revenue(partner: Partner) {
    return this.vouchersService
      .findAll({ relations: ['orders'], where: { partner: partner } })
      .then((vouchers) => {
        return vouchers.reduce((accumulator, voucher) => {
          return accumulator + voucher.orders.length * voucher.amount;
        }, 0);
      });
  }
}
