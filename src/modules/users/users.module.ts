import { Module } from '@nestjs/common';

import { PermissionRepository } from './repositories/permission.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, PermissionRepository],
  exports: [UserService, UserRepository, PermissionRepository],
})
export class UsersModule {}
