/// <reference types="next" />
/// <reference types="next/types/global" />

import { User } from '../server/app/users/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
