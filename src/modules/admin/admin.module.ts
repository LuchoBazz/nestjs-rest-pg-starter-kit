import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { CachedPermissionService } from './services/cached_permission.service';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [CacheModule],
  providers: [PermissionRepository, PermissionService, CachedPermissionService],
  exports: [PermissionRepository, PermissionService, CachedPermissionService],
})
export class AdminModule {}
