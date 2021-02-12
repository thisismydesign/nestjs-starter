import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Employee } from 'src/employees/interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} employee`;
  }
}
