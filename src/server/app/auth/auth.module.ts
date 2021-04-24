import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
  imports: [UsersModule, PassportModule, GoogleOauthModule, JwtAuthModule],
})
export class AuthModule {}
