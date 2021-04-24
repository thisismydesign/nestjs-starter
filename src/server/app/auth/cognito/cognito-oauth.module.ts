import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { CognitoOauthController } from './cognito-oauth.controller';
import { CognitoOauthStrategy } from './cognito-oauth.strategy';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [CognitoOauthController],
  providers: [CognitoOauthStrategy],
})
export class CognitoOauthModule {}
