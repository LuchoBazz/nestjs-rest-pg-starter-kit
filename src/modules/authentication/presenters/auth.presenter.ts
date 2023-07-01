import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../entities/users/user.entity';
import { AuthService } from '../services/auth.service';

interface PresentTokenResponse {
  token: string;
}

@Injectable()
export class AuthPresenter {
  constructor(private readonly authService: AuthService) {}

  public async presentToken(user: UserEntity): Promise<PresentTokenResponse> {
    const { token } = this.authService.createJwt(user);
    return { token };
  }
}
