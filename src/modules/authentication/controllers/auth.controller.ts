// user.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UserEntity } from '../../../entities/users';
import { JwtUser } from '../decorators';
import { AuthResponse, SignInInput, SignUpInput } from '../dto';
import { JwtAuthGuard } from '../guards';
import { AuthInteractor } from '../interactors';

@Controller('auth')
export class AuthController {
  constructor(private authInteractor: AuthInteractor) {}

  @Post('sign-up')
  public async signUp(@Body() input: SignUpInput): Promise<AuthResponse> {
    return this.authInteractor.signUp(input);
  }

  @Post('sign-in')
  public async signIn(@Body() input: SignInInput): Promise<AuthResponse> {
    return this.authInteractor.signIn(input);
  }

  @UseGuards(JwtAuthGuard)
  @Post('revoke-and-refresh-token')
  public async revokeAndRefreshToken(@JwtUser() user: UserEntity): Promise<AuthResponse> {
    return this.authInteractor.revokeAndRefreshToken(user);
  }
}
