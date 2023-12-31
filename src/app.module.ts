import { Module } from '@nestjs/common';

import { CacheModule } from './common/cache/cache.module';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { AuthGatewayModule } from './gateways/auth/auth_gateway.module';
import { FirebaseModule } from './gateways/auth/firebase/firebase.module';
import { SupabaseModule } from './gateways/auth/supabase/supabase.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AdminModule,
    AuthenticationModule,
    UsersModule,
    OrganizationsModule,
    ConfigurationModule,
    FirebaseModule,
    SupabaseModule,
    AuthGatewayModule,
    CacheModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
