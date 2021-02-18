import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(employee: Employee) {
    return this.employeesRepository.save(employee);
  }

  findOne(id: number) {
    return this.employeesRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Employee> = {}) {
    return this.employeesRepository.find(params);
  }
}
