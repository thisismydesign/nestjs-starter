import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  public index() {
    return {
      title: 'Nest with Next',
    };
  }
}
