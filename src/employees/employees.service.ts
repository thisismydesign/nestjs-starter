import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employees/interfaces/employee.interface';

@Injectable()
export class EmployeesService {
  private readonly employees: Employee[] = [];

  create(employee: Employee) {
    this.employees.push(employee);
  }

  findAll(): Employee[] {
    return this.employees;
  }
}
