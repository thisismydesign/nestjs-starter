import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { Employee } from 'src/employees/employee.entity';
import { OrdersModule } from 'src/orders/orders.module';
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
