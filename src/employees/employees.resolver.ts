import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { OrdersService } from 'src/orders/orders.service';

@Resolver((_of) => Employee)
export class EmployeesResolver {
  constructor(
    @Inject(EmployeesService) private employeesService: EmployeesService,
    @Inject(CompaniesService) private companiesService: CompaniesService,
    @Inject(OrdersService) private ordersService: OrdersService,
  ) {}

  @ResolveField()
  async company(@Parent() employee: Employee) {
    return this.companiesService.findOne(employee.company.id);
  }

  @ResolveField()
  async orders(@Parent() employee: Employee) {
    return this.ordersService.findAll({ where: { employee: employee } });
  }

  @Query((_returns) => [Employee])
  async employees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }
}
