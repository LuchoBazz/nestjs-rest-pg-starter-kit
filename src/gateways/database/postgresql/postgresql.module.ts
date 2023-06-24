import { Module } from '@nestjs/common';

import { PgGateway } from '.';

@Module({
  imports: [],
  providers: [PgGateway],
  exports: [PgGateway],
})
export class PostgresqlModule {}
