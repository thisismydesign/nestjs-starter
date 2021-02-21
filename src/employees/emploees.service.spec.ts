import { forwardRef } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { OrdersModule } from 'src/orders/orders.module';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';

describe('CatsController', () => {
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Employee]),
        forwardRef(() => CompaniesModule),
        forwardRef(() => OrdersModule),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'db',
          port: 5432,
          username: 'postgres',
          password: '',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
      providers: [EmployeesService],
    }).compile();

    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
  });

  describe('findOne', () => {
    it('returns empty array', async () => {
      expect(await employeesService.findAll()).toStrictEqual([]);
    });
  });
});
