import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { Company } from 'src/companies/company.entity';
import { CompaniesResolver } from './companies.resolver';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    forwardRef(() => EmployeesModule),
  ],
  providers: [CompaniesService, CompaniesResolver],
  // CompaniesService needs to be accessed from SeedService
  exports: [CompaniesService],
})
export class CompaniesModule {}
