import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { Employee } from 'src/server/app/employees/employee.entity';
import { OrdersService } from 'src/server/app/orders/orders.service';
import { SpendDto, TaxableSpend } from './dto/spend.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @Inject(OrdersService) private ordersService: OrdersService,
  ) {}

  create(employee: Employee) {
    return this.employeesRepository.save(employee);
  }

  findOne(id: number) {
    return this.employeesRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Employee> = {}) {
    return this.employeesRepository.find(params);
  }

  qb() {
    return this.employeesRepository.createQueryBuilder();
  }

  employeesByCompany(companyId: number) {
    return this.findAll({
      relations: ['company'],
      where: (qb: SelectQueryBuilder<Employee>) => {
        qb.where('Employee__company.id = :id', { id: companyId });
      },
    });
  }

  spend(employee: Employee) {
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

  spendInMonth(employee: Employee, month: Date) {
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
}
