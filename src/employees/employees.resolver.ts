import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Resolver((of) => Employee)
export class EmployeesResolver {
  constructor(
    @Inject(EmployeesService) private employeesService: EmployeesService,
  ) {}

  @Query((returns) => [Employee])
  async employees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }
}
