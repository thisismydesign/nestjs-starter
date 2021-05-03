import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Thing } from './thing.entity';
import { ThingsService } from './things.service';

@Resolver((_of) => Thing)
export class ThingsResolver {
  constructor(@Inject(ThingsService) private thingsService: ThingsService) {}

  @Query((_returns) => [Thing])
  async things(params: FindManyOptions<Thing> = {}): Promise<Thing[]> {
    return this.thingsService.findAll(params);
  }
}
