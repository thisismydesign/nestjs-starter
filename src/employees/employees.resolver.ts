import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { OrdersService } from 'src/orders/orders.service';
import { SelectQueryBuilder } from 'typeorm';
import { SpendDto, TaxableSpend } from './dto/spend.dto';

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
    return this.ordersService
      .findAll({
        where: { employee: employee },
        relations: ['voucher'],
      })
      .then((orders) => {
        return orders.reduce(
          (accumulator, order) => accumulator + order.voucher.amount,
          0,
        );
      });
  }

  @ResolveField((_returns) => SpendDto)
  async spendInMonth(
    @Parent() employee: Employee,
    @Args('month', { type: () => Date }) month: Date,
  ): Promise<SpendDto> {
    const maxTaxFreeSpend = 44;

    return this.ordersService
      .findAll({
        where: { employee: employee, date: month },
        relations: ['voucher'],
      })
      .then((orders) => {
        const spend = new SpendDto();
        spend.total = orders.reduce(
          (accumulator, order) => accumulator + order.voucher.amount,
          0,
        );
        spend.taxFree = Math.min(maxTaxFreeSpend, spend.total);
        spend.taxable = new TaxableSpend();
        spend.taxable.thirtyPercentBracket = Math.max(
          spend.total - maxTaxFreeSpend,
          0,
        );
        return spend;
      });
  }

  @Query((_returns) => [Employee])
  async employees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }

  @Query((_returns) => [Employee])
  async employeesByCompany(
    @Args('companyId', { type: () => Number }) companyId: number,
  ): Promise<Employee[]> {
    return await this.employeesService.findAll({
      relations: ['company'],
      where: (qb: SelectQueryBuilder<Employee>) => {
        qb.where('Employee__company.id = :id', { id: companyId });
      },
    });
  }
}
