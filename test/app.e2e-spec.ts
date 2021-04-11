import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/server/app/app.module';
import { INestApplication } from '@nestjs/common';
import { PartnersService } from 'src/server/app/partners/partners.service';
import { getConnection } from 'typeorm';
import {
  partnersFactory,
  companiesFactory,
  employeesFactory,
  vouchersFactory,
  ordersFactory,
} from 'test/factories';
import { Partner } from 'src/server/app/partners/partner.entity';
import { CompaniesService } from 'src/server/app/companies/companies.service';
import { EmployeesService } from 'src/server/app/employees/employees.service';
import { VouchersService } from 'src/server/app/vouchers/vouchers.service';
import { OrdersService } from 'src/server/app/orders/orders.service';

describe('Application', () => {
  let app: INestApplication;
  let employeesService: EmployeesService;
  let companiesService: CompaniesService;
  let vouchersService: VouchersService;
  let partnersService: PartnersService;
  let ordersService: OrdersService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    employeesService = app.get(EmployeesService);
    companiesService = app.get(CompaniesService);
    vouchersService = app.get(VouchersService);
    partnersService = app.get(PartnersService);
    ordersService = app.get(OrdersService);
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
  });

  describe('GraphQL', () => {
    const endpoint = '/graphql';

    describe('partners', () => {
      const query = '{ partners { id name revenue } }';
      let partner: Partner;

      beforeEach(async () => {
        partner = await partnersService.create(partnersFactory.build());
      });

      it('returns partners', () => {
        return request(app.getHttpServer())
          .post(endpoint)
          .send({ query: query })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.partners).toHaveLength(1);
            expect(res.body.data.partners[0].id).toEqual(partner.id);
            expect(res.body.data.partners[0].revenue).toEqual(0);
          });
      });

      describe('when there are orders', () => {
        const amount = 10;
        const orderCount = 3;

        beforeEach(async () => {
          const company = await companiesService.create(
            companiesFactory.build(),
          );
          const employee = await employeesService.create(
            employeesFactory.build({ company: company }),
          );
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

        it('returns partners with revenue', () => {
          return request(app.getHttpServer())
            .post(endpoint)
            .send({ query: query })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.partners[0].revenue).toEqual(
                amount * orderCount,
              );
            });
        });
      });
    });
  });
});
