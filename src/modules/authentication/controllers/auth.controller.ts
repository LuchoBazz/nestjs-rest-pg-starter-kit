// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { AuthResponse, SignUpInput } from '../dto';
import { AuthInteractor } from '../interactors';

@Controller('auth')
export class AuthController {
  constructor(private authInteractor: AuthInteractor) {}

  @Post('sign-up')
  public async signUp(@Body() input: SignUpInput): Promise<AuthResponse> {
    return this.authInteractor.signUp(input);
  }
}
