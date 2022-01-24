import * as request from 'supertest';

import { JwtAuthService } from 'src/server/app/auth/jwt/jwt-auth.service';
import { User } from 'src/server/app/users/user.entity';
import { SESSION_COOKIE_KEY } from 'src/server/config/constants';

export const login = (
  agent: request.Test,
  user: User,
  authService: JwtAuthService,
) => {
  const jwtToken = authService.login(user).accessToken;
  return agent.set('Cookie', [`${SESSION_COOKIE_KEY}=${jwtToken}`]);
};
