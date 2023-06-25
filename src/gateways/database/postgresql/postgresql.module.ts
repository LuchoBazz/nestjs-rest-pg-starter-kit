import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { FeatureFlagRepository } from './feature-flag.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [PgGateway, UserRepository, FeatureFlagRepository],
  exports: [PgGateway, UserRepository, FeatureFlagRepository],
})
export class PostgresqlModule {}
