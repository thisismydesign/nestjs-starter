import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './google-oauth.guard';
import { AuthService } from '../auth.service';

@Controller('auth/google')
export class GoogleOauthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    // "log in" user by creating JWT and redirecting
    // return this.authService.login(req);
    return req.user;
  }
}
