import { User } from './user';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
