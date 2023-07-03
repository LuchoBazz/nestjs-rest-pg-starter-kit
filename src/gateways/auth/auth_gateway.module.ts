import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { FirebaseModule } from './firebase/firebase.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [FirebaseModule, SupabaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthGatewayModule {}
