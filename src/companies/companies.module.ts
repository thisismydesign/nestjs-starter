import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { CompaniesResolver } from './companies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, CompaniesResolver],
  // CompaniesService needs to be accessed from SeedService
  exports: [CompaniesService],
})
export class CompaniesModule {}
