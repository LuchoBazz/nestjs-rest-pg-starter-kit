import { Injectable, UnauthorizedException } from '@nestjs/common';

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
}
