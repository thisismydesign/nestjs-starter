import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/server/app/orders/orders.module';
import { PartnersModule } from 'src/server/app/partners/partners.module';
import { Voucher } from './voucher.entity';
import { VouchersResolver } from './vouchers.resolver';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    forwardRef(() => PartnersModule),
    forwardRef(() => OrdersModule),
  ],
  providers: [VouchersService, VouchersResolver],
  // VouchersService needs to be accessed from SeedService
  exports: [VouchersService],
})
export class VouchersModule {}
