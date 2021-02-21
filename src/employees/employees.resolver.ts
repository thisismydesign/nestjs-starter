import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { OrdersService } from 'src/orders/orders.service';
import { SpendDto } from './dto/spend.dto';

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

  @ResolveField((_returns) => Number)
  async spend(@Parent() employee: Employee): Promise<number> {
    return this.employeesService.spend(employee);
  }

  @ResolveField((_returns) => SpendDto)
  async spendInMonth(
    @Parent() employee: Employee,
    @Args('month', { type: () => Date }) month: Date,
  ): Promise<SpendDto> {
    return this.employeesService.spendInMonth(employee, month);
  }

  @Query((_returns) => [Employee])
  async employees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }

  @Query((_returns) => [Employee])
  async employeesByCompany(
    @Args('companyId', { type: () => Int }) companyId: number,
  ): Promise<Employee[]> {
    return await this.employeesService.employeesByCompany(companyId);
  }
}
