import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CompaniesService } from 'src/companies/companies.service';

@Resolver((_of) => Employee)
export class EmployeesResolver {
  constructor(
    @Inject(EmployeesService) private employeesService: EmployeesService,
    @Inject(CompaniesService) private companiesService: CompaniesService,
  ) {}

  @ResolveField()
  async company(@Parent() employee: Employee) {
    return this.companiesService.findOne(employee.id);
  }

  @Query((_returns) => [Employee])
  async employees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }
}
