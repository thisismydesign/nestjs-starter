import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/server/app/orders/orders.module';
import { VouchersModule } from 'src/server/app/vouchers/vouchers.module';
import { Partner } from './partner.entity';
import { PartnersResolver } from './partners.resolver';
import { PartnersService } from './partners.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    forwardRef(() => VouchersModule),
    forwardRef(() => OrdersModule),
  ],
  providers: [PartnersService, PartnersResolver],
  // PartnersService needs to be accessed from SeedService
  exports: [PartnersService],
})
export class PartnersModule {}
