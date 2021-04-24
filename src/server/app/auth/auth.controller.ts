import { Controller, Get, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  async auth(@Res() res) {
    return res.redirect('/auth/google');
  }
}
