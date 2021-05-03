import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindOneOptions } from 'typeorm';

import { Thing } from './thing.entity';
import { CreateThingDto } from './dto/create-thing.dto';

@Injectable()
export class ThingsService {
  constructor(
    @InjectRepository(Thing)
    private thingsRepository: Repository<Thing>,
  ) {}

  create(thing: CreateThingDto) {
    return this.thingsRepository.save(thing);
  }

  findOne(params: FindOneOptions<Thing> = {}) {
    return this.thingsRepository.findOne(params);
  }

  findAll(params: FindManyOptions<Thing> = {}) {
    return this.thingsRepository.find(params);
  }
}
