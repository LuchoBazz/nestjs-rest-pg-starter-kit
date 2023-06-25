import { Module } from '@nestjs/common';

import { PgGateway } from '.';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [PgGateway, UserRepository],
  exports: [PgGateway, UserRepository],
})
export class PostgresqlModule {}
