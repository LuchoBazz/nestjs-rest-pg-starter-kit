import { Injectable } from '@nestjs/common';

import { CreateJWTOutput } from '../services/auth.service';

@Injectable()
export class AuthPresenter {
  public async signUp(params: CreateJWTOutput): Promise<any> {
    const { token } = params;
    return { token };
  }
}
