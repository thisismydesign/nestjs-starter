import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Partner } from './partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
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
}
