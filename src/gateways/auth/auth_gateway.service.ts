import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../entities/users/user.entity';
import { FeatureFlagService } from '../../modules/organizations/services/feature_flag.service';
import { PSQLSession } from '../database/postgresql';
import { AuthGatewayUser, BaseAuthService, DeleteUserPayload, ValidateTokenPayload } from './base.auth';
import { FirebaseAuthService } from './firebase/firebase_auth.service';
import { SupabaseAuthService } from './supabase/supabase_auth.service';

@Injectable()
export class AuthGatewayService {
  private providers: Record<AuthProvider, BaseAuthService>;
  private static instance: AuthGatewayService;

  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly featFlatService: FeatureFlagService,
  ) {
    if (AuthGatewayService.instance) {
      return AuthGatewayService.instance;
    }

    this.providers = {
      [AuthProvider.FIREBASE]: this.firebaseAuthService,
      [AuthProvider.SUPABASE]: this.supabaseAuthService,
    };

    AuthGatewayService.instance = this;
    return AuthGatewayService.instance;
  }

  private async getAuthService(manager: PSQLSession, clientId: string): Promise<BaseAuthService> {
    const authProvider = await this.featFlatService.findAuthProvider(manager, { clientId });
    return this.providers[authProvider];
  }

  public async validateToken(
    manager: PSQLSession,
    payload: ValidateTokenPayload,
  ): Promise<AuthGatewayUser | undefined> {
    const { email, clientId } = payload;
    const authService = await this.getAuthService(manager, clientId);
    const user = await authService.validateToken(payload);
    const isValidUser = user && !(!user.uid || (email && user.email !== email));
    return isValidUser ? user : undefined;
  }

  public async deleteUser(manager: PSQLSession, payload: DeleteUserPayload): Promise<boolean> {
    const { clientId } = payload;
    const authService = await this.getAuthService(manager, clientId);
    return authService.deleteUser(payload);
  }
}
