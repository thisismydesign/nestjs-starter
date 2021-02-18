import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(order: Order) {
    return this.ordersRepository.save(order);
  }

  findOne(id: number) {
    return this.ordersRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Order> = {}) {
    return this.ordersRepository.find(params);
  }
}
