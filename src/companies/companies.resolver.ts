import { Company } from './company.entity';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { EmployeesService } from 'src/employees/employees.service';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
    @Inject(EmployeesService) private employeesService: EmployeesService,
  ) {}

  @ResolveField()
  async employees(@Parent() company: Company) {
    return this.employeesService.findAll({ where: { company: company } });
  }

  @Query((returns) => [Company])
  async companies(): Promise<Company[]> {
    return this.companiesService.findAll();
  }
}
