import { Module } from '@nestjs/common';
// import { EmployeesController } from './employees.controller';
import { CompaniesService } from './companies.service';
import { CompanyResolver } from './company.resolver';

@Module({
  // controllers: [EmployeesController],
  providers: [CompaniesService, CompanyResolver],
})
export class CompaniesModule {}
