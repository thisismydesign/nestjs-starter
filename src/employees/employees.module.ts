import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employee.entity';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeesService, EmployeesResolver],
  // EmployeesService needs to be accessed from SeedService
  exports: [EmployeesService],
})
export class EmployeesModule {}
