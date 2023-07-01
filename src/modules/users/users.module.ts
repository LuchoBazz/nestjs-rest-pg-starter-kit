import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/users.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
