import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken);
    return res.redirect('/profile');
  }
}
