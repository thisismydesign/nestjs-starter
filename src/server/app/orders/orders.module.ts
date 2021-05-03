import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order } from './order.entity';
import { ThingsModule } from '../things/things.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ThingsModule],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
