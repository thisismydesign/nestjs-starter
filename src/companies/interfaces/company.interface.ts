import { EmployeeModel } from 'src/employees/employee.model';

export interface Company {
  name: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  employees?: EmployeeModel[];
}
