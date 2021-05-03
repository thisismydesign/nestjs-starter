import { Factory } from 'fishery';
import * as faker from 'faker';

import { CreateUserDto } from 'src/server/app/users/dto/create-user.dto';

export default Factory.define<CreateUserDto>(() => ({
  provider: faker.random.arrayElement(['google', 'cognito']),
  providerId: faker.datatype.hexaDecimal(10),
  username: faker.internet.email(),
  name: faker.name.findName(),
}));
