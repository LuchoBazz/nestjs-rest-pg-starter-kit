import { Module } from '@nestjs/common';

import { CacheModule } from '../../../common/cache/cache.module';
import { PgGateway } from '.';
import { FeatureFlagRepository } from './feature-flag.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [CacheModule],
  providers: [PgGateway, UserRepository, FeatureFlagRepository],
  exports: [PgGateway, UserRepository, FeatureFlagRepository],
})
export class PostgresqlModule {}
