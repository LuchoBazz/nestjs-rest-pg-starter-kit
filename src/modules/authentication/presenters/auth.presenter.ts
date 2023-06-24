import { Injectable } from '@nestjs/common';

import { CreateJWTOutput } from '../services/auth.service';

interface PresentTokenResponse {
  token: string;
}

@Injectable()
export class AuthPresenter {
  public async presentToken(params: CreateJWTOutput): Promise<PresentTokenResponse> {
    const { token } = params;
    return { token };
  }
}
