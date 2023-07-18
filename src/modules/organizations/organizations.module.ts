import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { FeatureFlagInteractor } from './interactors/feature_flag.interactor';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';
import { FeatureFlagResolver } from './resolvers/feature_flag.resolver';
import { CachedFeatureFlagService } from './services/cached_feature_flag.service';
import { FeatureFlagService } from './services/feature_flag.service';

@Module({
  imports: [CacheModule, PostgresqlModule, forwardRef(() => AuthenticationModule), UsersModule],
  providers: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagResolver,
    FeatureFlagInteractor,
    CachedFeatureFlagService,
  ],
  exports: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagResolver,
    FeatureFlagInteractor,
    CachedFeatureFlagService,
  ],
})
export class OrganizationsModule {}
