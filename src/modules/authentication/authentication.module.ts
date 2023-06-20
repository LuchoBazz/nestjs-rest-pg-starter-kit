import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'c1e630b708c741e7875b0ffcd8e8c03a',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [],
  providers: [AuthService],
})
export class AuthenticationModule {}
