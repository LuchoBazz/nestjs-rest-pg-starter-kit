import { Module } from '@nestjs/common';

import { ConfigurationModule } from '../common/configuration/configuration.module';
import { FirebaseModule } from '../gateways/auth/firebase/firebase.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthenticationModule, UsersModule, OrganizationsModule, ConfigurationModule, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
