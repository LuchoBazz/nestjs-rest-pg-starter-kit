import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import supabaseConfig from '../../../common/configuration/supabase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [supabaseConfig],
    }),
  ],
  providers: [],
  exports: [],
})
export class SupabaseModule {}
