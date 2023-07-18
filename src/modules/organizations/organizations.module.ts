import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { FeatureFlagInteractor } from './interactors';
import { CachedFeatureFlagRepository, FeatureFlagRepository } from './repositories';
import { FeatureFlagResolver } from './resolvers';
import { FeatureFlagService } from './services';

@Module({
  imports: [CacheModule, PostgresqlModule, forwardRef(() => AuthenticationModule), UsersModule],
  providers: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagResolver,
    FeatureFlagInteractor,
    CachedFeatureFlagRepository,
  ],
  exports: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagResolver,
    FeatureFlagInteractor,
    CachedFeatureFlagRepository,
  ],
})
export class OrganizationsModule {}
