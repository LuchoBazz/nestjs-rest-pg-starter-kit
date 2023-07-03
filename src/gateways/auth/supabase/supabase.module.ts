import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import supabaseConfig from '../../../common/configuration/supabase.config';
import { SupabaseAuthService } from './supabase_auth.service';
import { SupabaseConfigService } from './supabase_config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [supabaseConfig],
    }),
  ],
  providers: [SupabaseConfigService, SupabaseAuthService],
  exports: [SupabaseConfigService, SupabaseAuthService],
})
export class SupabaseModule {}
