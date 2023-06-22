import { Injectable } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInteractor {
  constructor(private readonly authService: AuthService) {}

  public async signUp(): Promise<any> {
    return {};
  }
}
