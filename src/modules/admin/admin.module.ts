import { Module } from '@nestjs/common';

import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [],
  providers: [PermissionRepository, PermissionService],
  exports: [PermissionRepository, PermissionService],
})
export class AdminModule {}
