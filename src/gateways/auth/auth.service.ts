import { Injectable } from '@nestjs/common';

import { AuthGatewayUser, BaseAuthService, DeleteUserPayload, ValidateTokenPayload } from './base.auth';
import { FirebaseAuthService } from './firebase/firebase_auth.service';
import { SupabaseAuthService } from './supabase/supabase_auth.service';

@Injectable()
export class AuthService {
  private providers: Record<string, BaseAuthService> = {};

  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly supabaseAuthService: SupabaseAuthService,
  ) {
    this.providers = {
      FIREBASE: this.firebaseAuthService,
      SUPABASE: this.supabaseAuthService,
    };
  }

  public async validateToken(payload: ValidateTokenPayload): Promise<AuthGatewayUser | undefined> {
    const { email } = payload;
    const user = await this.providers.FIREBASE.validateToken(payload);
    return !user?.uid || (email && user?.email !== email) ? undefined : user;
  }

  public async deleteUser(payload: DeleteUserPayload): Promise<boolean> {
    return this.providers.FIREBASE.deleteUser(payload);
  }
}
