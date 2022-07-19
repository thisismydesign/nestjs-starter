import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { CreateUserDto } from 'src/server/app/users/dto/create-user.dto';

export default Factory.define<CreateUserDto>(() => ({
  provider: faker.helpers.arrayElement(['google', 'cognito']),
  providerId: faker.datatype.hexadecimal(10),
  username: faker.internet.email(),
  name: faker.name.findName(),
}));
