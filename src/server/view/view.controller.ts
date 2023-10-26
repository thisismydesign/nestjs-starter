import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../app/auth/jwt/jwt-auth.guard';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
  @Get('home')
  public async home(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:path((?!graphql$))*')
  public async authenticatedPage(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
