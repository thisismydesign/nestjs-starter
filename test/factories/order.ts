import { Factory } from 'fishery';
import { Order } from 'src/server/app/orders/order.entity';
import * as faker from 'faker';
import voucherFactory from './voucher';
import employeeFactory from './employee';

export default Factory.define<Order>(({ sequence }) => ({
  id: sequence,
  voucher: voucherFactory.build(),
  employee: employeeFactory.build(),
  date: faker.date.past(),
}));
