import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/server/companies/companies.module';
import { Employee } from 'src/server/employees/employee.entity';
import { OrdersModule } from 'src/server/orders/orders.module';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => CompaniesModule),
    forwardRef(() => OrdersModule),
  ],
  providers: [EmployeesService, EmployeesResolver],
  // EmployeesService needs to be accessed from SeedService
  exports: [EmployeesService],
})
export class EmployeesModule {}
