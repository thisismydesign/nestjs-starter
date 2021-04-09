import { Factory } from 'fishery';
import { Partner } from 'src/server/partners/partner.entity';
import * as faker from 'faker';

export default Factory.define<Partner>(({ sequence }) => ({
  id: sequence,
  name: faker.company.companyName(),
}));
