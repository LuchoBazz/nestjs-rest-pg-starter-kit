import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { CacheService } from './cache.service';

@Module({
  imports: [],
  providers: [PgGateway, CacheService],
  exports: [PgGateway, CacheService],
})
export class PostgresqlModule {}
