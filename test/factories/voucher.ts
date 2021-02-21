import { Factory } from 'fishery';
import { Voucher } from 'src/vouchers/voucher.entity';
import * as faker from 'faker';
import partnerFactory from './partner';

export default Factory.define<Voucher>(({ sequence }) => ({
  id: sequence,
  amount: faker.random.number(),
  partner: partnerFactory.build(),
}));
