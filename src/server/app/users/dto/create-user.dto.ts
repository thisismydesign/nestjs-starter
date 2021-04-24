import { Provider } from '../user.entity';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
