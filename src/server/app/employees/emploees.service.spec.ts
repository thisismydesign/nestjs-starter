import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/server/app/companies/companies.module';
import { CompaniesService } from 'src/server/app/companies/companies.service';
import { Company } from 'src/server/app/companies/company.entity';
import { OrdersModule } from 'src/server/app/orders/orders.module';
import { getConnection } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';
import {
  partnersFactory,
  companiesFactory,
  employeesFactory,
  vouchersFactory,
  ordersFactory,
} from 'test/factories';
import { PartnersModule } from 'src/server/app/partners/partners.module';
import { VouchersModule } from 'src/server/app/vouchers/vouchers.module';
import { VouchersService } from 'src/server/app/vouchers/vouchers.service';
import { PartnersService } from 'src/server/app/partners/partners.service';
import { OrdersService } from 'src/server/app/orders/orders.service';

describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let companiesService: CompaniesService;
  let vouchersService: VouchersService;
  let partnersService: PartnersService;
  let ordersService: OrdersService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Employee]),
        forwardRef(() => CompaniesModule),
        forwardRef(() => OrdersModule),
        forwardRef(() => PartnersModule),
        forwardRef(() => VouchersModule),
        TypeOrmModule.forRoot({
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
      providers: [EmployeesService],
    }).compile();

    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    companiesService = moduleRef.get<CompaniesService>(CompaniesService);
    vouchersService = moduleRef.get<VouchersService>(VouchersService);
    partnersService = moduleRef.get<PartnersService>(PartnersService);
    ordersService = moduleRef.get<OrdersService>(OrdersService);

    await getConnection().synchronize(true);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  describe('findOne', () => {
    it('returns empty array when no employees', async () => {
      expect(await employeesService.findAll()).toStrictEqual([]);
    });
  });

  describe('employeesByCompany', () => {
    let company: Company;
    let employee: Employee;

    beforeEach(async () => {
      company = await companiesService.create(companiesFactory.build());
      employee = await employeesService.create(
        employeesFactory.build({ company: company }),
      );
    });

    it('returns company employees', async () => {
      const result = await employeesService.employeesByCompany(
        employee.company.id,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(employee.id);
    });

    it('doesn not return employees from other company', async () => {
      const otherCompany = await companiesService.create(
        companiesFactory.build(),
      );
      const otherEmployee = await employeesService.create(
        employeesFactory.build({ company: otherCompany }),
      );

      const result = await employeesService.employeesByCompany(
        employee.company.id,
      );

      expect(result).toHaveLength(1);
      expect(result[0].id).not.toEqual(otherEmployee.id);
    });
  });

  describe('spend', () => {
    let employee: Employee;
    const amount = 10;
    const orderCount = 3;

    beforeEach(async () => {
      const company = await companiesService.create(companiesFactory.build());
      employee = await employeesService.create(
        employeesFactory.build({ company: company }),
      );
    });

    it('returns 0', async () => {
      const result = await employeesService.spend(employee);

      expect(result).toEqual(0);
    });

    describe('when there are orders', () => {
      beforeEach(async () => {
        const partner = await partnersService.create(partnersFactory.build());
        const voucher = await vouchersService.create(
          vouchersFactory.build({ partner: partner, amount: amount }),
        );

        await Promise.all(
          Array(orderCount)
            .fill('')
            .map(() => {
              return ordersService.create(
                ordersFactory.build({ voucher: voucher, employee: employee }),
              );
            }),
        );
      });

      it('returns total order value employee', async () => {
        const result = await employeesService.spend(employee);

        expect(result).toEqual(amount * orderCount);
      });
    });
  });
});
