import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import * as Papa from 'papaparse';
import { CompaniesService } from 'src/server/companies/companies.service';
import { EmployeesService } from 'src/server/employees/employees.service';
import * as fs from 'fs';
import * as path from 'path';
import { PartnersService } from 'src/server/partners/partners.service';
import { VouchersService } from 'src/server/vouchers/vouchers.service';
import { OrdersService } from 'src/server/orders/orders.service';

@Console()
export class SeedService {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
    @Inject(EmployeesService) private employeesService: EmployeesService,
    @Inject(PartnersService) private partnersService: PartnersService,
    @Inject(VouchersService) private vouchersService: VouchersService,
    @Inject(OrdersService) private ordersService: OrdersService,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB');

    await this.seedEmployees();
    await this.seedVouchers();
    await this.seedOrders();

    spin.succeed('Seeding done');
  }

  async seedEmployees() {
    const employeesData = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'employees.csv'),
      'utf8',
    );

    const parsedEmployeesData = Papa.parse(employeesData, { header: true });
    for await (const employeeData of parsedEmployeesData.data) {
      let company = await this.companiesService.findOne(
        employeeData['Company ID'],
      );
      if (!company) {
        company = await this.companiesService.create({
          id: employeeData['Company ID'],
          name: employeeData['Company Title'],
        });
      }
      const employee = await this.employeesService.findOne(
        employeeData['Employee ID'],
      );
      if (!employee) {
        await this.employeesService.create({
          id: employeeData['Employee ID'],
          name: employeeData['Employee Name'],
          budget: employeeData['Monthly Budget'],
          company: company,
        });
      }
    }
  }

  async seedVouchers() {
    const vouchersData = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'vouchers.csv'),
      'utf8',
    );

    const parsedVouchersData = Papa.parse(vouchersData, { header: true });
    for await (const voucherData of parsedVouchersData.data) {
      let partner = await this.partnersService.findOne(
        voucherData['Partner ID'],
      );
      if (!partner) {
        partner = await this.partnersService.create({
          id: voucherData['Partner ID'],
          name: voucherData['Partner Name'],
        });
      }
      const voucher = await this.vouchersService.findOne(
        voucherData['Voucher ID'],
      );
      if (!voucher) {
        await this.vouchersService.create({
          id: voucherData['Voucher ID'],
          amount: voucherData['Voucher Amount'],
          partner: partner,
        });
      }
    }
  }

  async seedOrders() {
    const ordersData = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'orders.csv'),
      'utf8',
    );

    const parsedOrdersData = Papa.parse(ordersData, { header: true });
    for await (const orderData of parsedOrdersData.data) {
      const order = await this.ordersService.findOne(orderData['Order ID']);
      if (!order) {
        const employee = await this.employeesService.findOne(
          orderData['Employee ID'],
        );
        const voucher = await this.vouchersService.findOne(
          orderData['Voucher ID'],
        );
        await this.ordersService.create({
          id: orderData['Order ID'],
          date: orderData['Order Date'],
          employee: employee,
          voucher: voucher,
        });
      }
    }
  }
}
