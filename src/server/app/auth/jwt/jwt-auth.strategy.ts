import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESSION_COOKIE_KEY } from 'src/server/config/constants';

export type JwtPayload = { sub: number; username: string };
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const extractJwtFromRequest = (req) => {
      let token = null;

      if (ExtractJwt.fromAuthHeaderAsBearerToken()(req)) {
        token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      } else if (req && req.cookies && req.cookies[SESSION_COOKIE_KEY]) {
        token = req.cookies[SESSION_COOKIE_KEY];
      }
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromRequest,
      ignoreExpiration: false,

      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
