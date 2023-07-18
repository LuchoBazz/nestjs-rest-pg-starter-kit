import { Module } from '@nestjs/common';

import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
