import { Module } from '@nestjs/common';

import { PermissionRepository } from './repositories/permission.repository';
import { UserRepository } from './repositories/user.repository';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, PermissionRepository, PermissionService],
  exports: [UserService, UserRepository, PermissionRepository, PermissionService],
})
export class UsersModule {}
