import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { AuthTokenStatuses } from './auth_token_statuses.repository';
import { CacheService } from './cache.service';
import { FeatureFlagRepository } from './feature-flag.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [PgGateway, UserRepository, FeatureFlagRepository, AuthTokenStatuses, CacheService],
  exports: [PgGateway, UserRepository, FeatureFlagRepository, AuthTokenStatuses, CacheService],
})
export class PostgresqlModule {}
