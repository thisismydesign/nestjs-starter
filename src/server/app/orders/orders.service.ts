import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ThingsService } from '../things/things.service';
import {
  CreateOrderDto,
  CreateOrderFromThingDetailsDto,
} from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject(ThingsService) private thingsService: ThingsService,
  ) {}

  create(order: CreateOrderDto) {
    return this.ordersRepository.save(order);
  }

  findOne(params: FindOneOptions<Order> = {}) {
    return this.ordersRepository.findOne(
      Object.assign({ relations: ['user', 'thing'] }, params),
    );
  }

  findAll(params: FindManyOptions<Order> = {}) {
    return this.ordersRepository.find(
      Object.assign({ relations: ['user', 'thing'] }, params),
    );
  }

  async findOrCreateOne(params: FindOneOptions<Order> = {}) {
    let order: Order;

    order = await this.findOne(params);
    if (!order) {
      const conditions = params.where as CreateOrderDto;
      order = await this.create({
        alias: conditions.alias,
        user: conditions.user,
        thing: conditions.thing,
      });
    }

    return order;
  }

  async createFromThingDetails(params: CreateOrderFromThingDetailsDto) {
    const thing = await this.thingsService.findOne({
      where: { name: params.thingName },
    });

    return this.findOrCreateOne({
      where: { user: params.user, alias: params.alias, thing: thing },
    });
  }
}
