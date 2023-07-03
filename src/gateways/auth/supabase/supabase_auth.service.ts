import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';

import { SupabaseConfigService } from './supabase_config.service';

@Injectable()
export class SupabaseAuthService {
  constructor(private readonly supabaseConfig: SupabaseConfigService) {}

  public async validateToken(clientId: string, accessToken: string): Promise<any> {
    try {
      const supabase = await this.supabaseConfig.getSupabaseApp(clientId);
      const { data } = await supabase.auth.getUser(accessToken);
      return data.user;
    } catch (error) {
      throw new UnauthorizedException('INVALID_JWT_TOKEN');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async updateUser(clientId: string, uid: string, user: UpdateRequest): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async deleteUser(clientId: string, uid: string): Promise<void> {}
}
