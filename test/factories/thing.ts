import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { CreateThingDto } from 'src/server/app/things/dto/create-thing.dto';

export default Factory.define<CreateThingDto>(() => ({
  name: faker.lorem.words(),
}));
