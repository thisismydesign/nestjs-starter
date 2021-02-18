import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VouchersModule } from 'src/vouchers/vouchers.module';
import { Partner } from './partner.entity';
import { PartnersResolver } from './partners.resolver';
import { PartnersService } from './partners.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    forwardRef(() => VouchersModule),
  ],
  providers: [PartnersService, PartnersResolver],
  // PartnersService needs to be accessed from SeedService
  exports: [PartnersService],
})
export class PartnersModule {}
