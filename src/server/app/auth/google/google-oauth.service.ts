import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOauthService {
  login(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
