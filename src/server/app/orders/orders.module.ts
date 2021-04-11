import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/server/app/employees/employees.module';
import { VouchersModule } from 'src/server/app/vouchers/vouchers.module';
import { Order } from './order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => EmployeesModule),
    forwardRef(() => VouchersModule),
  ],
  providers: [OrdersService, OrdersResolver],
  // OrdersService needs to be accessed from SeedService
  exports: [OrdersService],
})
export class OrdersModule {}
