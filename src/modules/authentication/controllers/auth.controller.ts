// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { AuthResponse, SignInInput, SignUpInput } from '../dto';
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
}
