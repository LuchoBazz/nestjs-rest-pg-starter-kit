import { Module } from '@nestjs/common';

import { OrganizationsModule } from '../../modules/organizations/organizations.module';
import { AuthGatewayService } from './auth_gateway.service';
import { FirebaseModule } from './firebase/firebase.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [FirebaseModule, SupabaseModule, OrganizationsModule],
  providers: [AuthGatewayService],
  exports: [AuthGatewayService],
})
export class AuthGatewayModule {}
