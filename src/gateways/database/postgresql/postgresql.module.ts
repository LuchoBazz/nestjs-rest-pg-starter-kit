import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { AuthTokenStatuses } from './auth_token_statuses.repository';
import { CacheService } from './cache.service';

@Module({
  imports: [],
  providers: [PgGateway, AuthTokenStatuses, CacheService],
  exports: [PgGateway, AuthTokenStatuses, CacheService],
})
export class PostgresqlModule {}
