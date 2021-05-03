import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/server/app/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { usersFactory } from 'test/factories';
import { UsersService } from 'src/server/app/users/users.service';
import { User } from 'src/server/app/users/user.entity';

describe('Application', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = app.get(UsersService);
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
  });
});
