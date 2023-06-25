import { Module } from '@nestjs/common';

import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { UserService } from './services/users.service';

@Module({
  imports: [PostgresqlModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
