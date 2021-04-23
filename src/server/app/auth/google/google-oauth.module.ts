import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy, GoogleOauthService],
})
export class GoogleOauthModule {}
