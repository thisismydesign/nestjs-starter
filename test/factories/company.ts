import { Factory } from 'fishery';
import { Company } from 'src/server/companies/company.entity';
import * as faker from 'faker';

export default Factory.define<Company>(({ sequence }) => ({
  id: sequence,
  name: faker.company.companyName(),
}));
