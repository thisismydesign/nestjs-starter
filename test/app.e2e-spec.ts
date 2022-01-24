import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/server/app/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as cookieParser from 'cookie-parser';

import { usersFactory, ordersFactory, thingsFactory } from 'test/factories';
import { UsersService } from 'src/server/app/users/users.service';
import { User } from 'src/server/app/users/user.entity';
import { Order } from 'src/server/app/orders/order.entity';
import { OrdersService } from 'src/server/app/orders/orders.service';
import { JwtAuthService } from 'src/server/app/auth/jwt/jwt-auth.service';
import { ThingsService } from 'src/server/app/things/things.service';
import { login } from './utils';

describe('Application', () => {
  let app: INestApplication;
  let authService: JwtAuthService;
  let usersService: UsersService;
  let ordersService: OrdersService;
  let thingsService: ThingsService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    usersService = app.get(UsersService);
    ordersService = app.get(OrdersService);
    authService = app.get(JwtAuthService);
    thingsService = app.get(ThingsService);
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
  });

  describe('GraphQL', () => {
    const endpoint = '/graphql';
    let agent: request.Test;

    beforeEach(async () => {
      agent = request(app.getHttpServer()).post(endpoint);
    });

    describe('users', () => {
      const query = '{ users { id provider } }';
      let user: User;

      beforeEach(async () => {
        user = await usersService.create(usersFactory.build());
      });

      it('returns users', () => {
        return agent
          .send({ query: query })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.users).toHaveLength(1);
            expect(res.body.data.users[0].id).toEqual(user.id);
            expect(res.body.data.users[0].provider).toEqual(user.provider);
          });
      });
    });

    describe('orders', () => {
      const query = '{ orders { id alias } }';
      let user: User;
      let order: Order;

      it('returns unauthorized', () => {
        return agent
          .send({ query: query })
          .expect(200)
          .expect((res) => {
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].message).toEqual('Unauthorized');
          });
      });

      describe('when authorized', () => {
        beforeEach(async () => {
          user = await usersService.create(usersFactory.build());
          const thing = await thingsService.create(thingsFactory.build());
          order = await ordersService.create(
            ordersFactory.build(
              {},
              { associations: { user: user, thing: thing } },
            ),
          );
        });

        it('returns orders', () => {
          return login(agent, user, authService)
            .send({ query: query })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.orders).toHaveLength(1);
              expect(res.body.data.orders[0].id).toEqual(order.id);
            });
        });
      });
    });
  });
});
