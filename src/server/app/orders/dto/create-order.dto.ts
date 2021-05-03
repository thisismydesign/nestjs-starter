import { Thing } from '../../things/thing.entity';
import { User } from '../../users/user.entity';

export class CreateOrderDto {
  alias: string;
  user: User;
  thing: Thing;
}

export class CreateOrderFromThingDetailsDto {
  alias: string;
  user: User;
  thingName: string;
}
