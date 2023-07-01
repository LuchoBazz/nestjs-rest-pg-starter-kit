import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { AuthTokenStatuses } from './auth_token_statuses.repository';
import { CacheService } from './cache.service';
import { FeatureFlagRepository } from './feature-flag.repository';

@Module({
  imports: [],
  providers: [PgGateway, FeatureFlagRepository, AuthTokenStatuses, CacheService],
  exports: [PgGateway, FeatureFlagRepository, AuthTokenStatuses, CacheService],
})
export class PostgresqlModule {}
