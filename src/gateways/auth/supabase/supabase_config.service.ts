import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import supabaseConfig, { SupabaseConfig } from '../../../common/configuration/supabase.config';

@Injectable()
export class SupabaseConfigService {
  private config: Record<string, SupabaseClient> = {};

  constructor(@Inject(supabaseConfig.KEY) config: ConfigType<typeof supabaseConfig>) {
    const supaConfigEnv: SupabaseConfig = config;
    const organizations: string[] = Object.keys(supaConfigEnv);

    for (const client_id of organizations) {
      const { url: supabaseUrl, key: supabaseKey } = supaConfigEnv[client_id];
      this.config[client_id] = createClient(supabaseUrl, supabaseKey);
    }
  }

  public getSupabaseApp(clientId: string): SupabaseClient {
    return this.config[clientId];
  }
}
