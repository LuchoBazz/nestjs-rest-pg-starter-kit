import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';

@Module({
  imports: [CacheModule],
  providers: [FeatureFlagRepository],
  exports: [FeatureFlagRepository],
})
export class OrganizationsModule {}
