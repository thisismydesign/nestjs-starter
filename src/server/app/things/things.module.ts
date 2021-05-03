import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Thing } from './thing.entity';
import { ThingsResolver } from './things.resolver';
import { ThingsService } from './things.service';

@Module({
  imports: [TypeOrmModule.forFeature([Thing])],
  providers: [ThingsService, ThingsResolver],
  exports: [ThingsService],
})
export class ThingsModule {}
