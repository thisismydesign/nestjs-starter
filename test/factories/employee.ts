import { Factory } from 'fishery';
import * as faker from 'faker';
import { Employee } from 'src/server/app/employees/employee.entity';
import companiesFactory from 'test/factories/company';

export default Factory.define<Employee>(({ sequence }) => ({
  id: sequence,
  name: faker.company.companyName(),
  budget: faker.random.number(),
  company: companiesFactory.build(),
}));
