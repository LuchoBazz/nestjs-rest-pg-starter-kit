import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { FeatureFlagInteractor } from './interactors/feature_flag.interactor';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';
import { FeatureFlagResolver } from './resolvers/feature_flag.resolver';

@Module({
  imports: [CacheModule, PostgresqlModule],
  providers: [FeatureFlagRepository, FeatureFlagResolver, FeatureFlagInteractor],
  exports: [FeatureFlagRepository, FeatureFlagResolver, FeatureFlagInteractor],
})
export class OrganizationsModule {}
