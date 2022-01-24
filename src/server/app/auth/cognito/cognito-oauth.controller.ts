import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SESSION_COOKIE_KEY } from 'src/server/config/constants';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CognitoOauthGuard } from './cognito-oauth.guard';

@Controller('auth/cognito')
export class CognitoOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(CognitoOauthGuard)
  async cognitoAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(CognitoOauthGuard)
  async cognitoAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.redirect('/profile');
  }
}
