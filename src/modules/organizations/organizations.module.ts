import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { PermissionsGuard } from '../authentication/guards/permission.guard';
import { UsersModule } from '../users/users.module';
import { FeatureFlagInteractor } from './interactors/feature_flag.interactor';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';
import { FeatureFlagResolver } from './resolvers/feature_flag.resolver';

@Module({
  imports: [CacheModule, PostgresqlModule, forwardRef(() => AuthenticationModule), UsersModule],
  providers: [FeatureFlagRepository, FeatureFlagResolver, FeatureFlagInteractor, PermissionsGuard],
  exports: [FeatureFlagRepository, FeatureFlagResolver, FeatureFlagInteractor],
})
export class OrganizationsModule {}
