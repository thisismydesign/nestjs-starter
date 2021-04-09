import { Module } from '@nestjs/common';

import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
