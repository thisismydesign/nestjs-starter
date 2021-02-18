import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { VouchersService } from 'src/vouchers/vouchers.service';

@Resolver((_of) => Order)
export class OrdersResolver {
  constructor(
    @Inject(OrdersService) private ordersService: OrdersService,
    @Inject(EmployeesService) private employeesService: EmployeesService,
    @Inject(VouchersService) private vouchersService: VouchersService,
  ) {}

  @ResolveField()
  async employee(@Parent() order: Order) {
    return this.employeesService.findOne(order.employee.id);
  }

  @ResolveField()
  async voucher(@Parent() order: Order) {
    return this.vouchersService.findOne(order.voucher.id);
  }

  @Query((_returns) => [Order])
  async orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
