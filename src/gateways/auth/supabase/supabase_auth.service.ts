import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGatewayUser, BaseAuthService, DeleteUserPayload, ValidateTokenPayload } from '../base.auth';
import { SupabaseConfigService } from './supabase_config.service';

@Injectable()
export class SupabaseAuthService extends BaseAuthService {
  constructor(private readonly supabaseConfig: SupabaseConfigService) {
    super();
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<AuthGatewayUser> {
    try {
      const supabase = await this.supabaseConfig.getSupabaseApp(clientId);
      const { data } = await supabase.auth.getUser(accessToken);
      const { user } = data;
      return {
        uid: user.id,
        email: user.email,
      };
    } catch (error) {
      throw new UnauthorizedException('INVALID_JWT_TOKEN');
    }
  }

  public async deleteUser({ clientId, uid }: DeleteUserPayload): Promise<boolean> {
    try {
      const supabase = await this.supabaseConfig.getSupabaseApp(clientId);
      const { error } = await supabase.auth.admin.deleteUser(uid);
      return !error;
    } catch (error) {
      throw new UnauthorizedException('DELETING_USER_ERROR');
    }
  }
}
