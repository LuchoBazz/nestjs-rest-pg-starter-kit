import { Module } from '@nestjs/common';

import { CacheModule } from './common/cache/cache.module';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { FirebaseModule } from './gateways/auth/firebase/firebase.module';
import { GraphqlModule } from './gateways/graphql/graphql.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthenticationModule,
    GraphqlModule,
    UsersModule,
    OrganizationsModule,
    ConfigurationModule,
    FirebaseModule,
    CacheModule,
  ],
})
export class AppModule {}
