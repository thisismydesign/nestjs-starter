import { User } from '../app/users/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
