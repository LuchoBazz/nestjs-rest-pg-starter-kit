import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { AuthTokenStatuses } from './auth_token_statuses.repository';
import { FeatureFlagRepository } from './feature-flag.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [PgGateway, UserRepository, FeatureFlagRepository, AuthTokenStatuses],
  exports: [PgGateway, UserRepository, FeatureFlagRepository, AuthTokenStatuses],
})
export class PostgresqlModule {}
