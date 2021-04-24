import { Controller, Request, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate(@Request() req) {
    return req.user;
  }
}
