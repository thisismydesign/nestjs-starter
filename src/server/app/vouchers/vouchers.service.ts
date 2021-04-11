import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Voucher } from './voucher.entity';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private vouchersRepository: Repository<Voucher>,
  ) {}

  create(voucher: Voucher) {
    return this.vouchersRepository.save(voucher);
  }

  findOne(id: number) {
    return this.vouchersRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Voucher> = {}) {
    return this.vouchersRepository.find(params);
  }
}
