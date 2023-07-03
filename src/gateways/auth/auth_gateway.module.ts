import { Module } from '@nestjs/common';

import { OrganizationsModule } from '../../modules/organizations/organizations.module';
import { AuthService } from './auth.service';
import { FirebaseModule } from './firebase/firebase.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [FirebaseModule, SupabaseModule, OrganizationsModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthGatewayModule {}
