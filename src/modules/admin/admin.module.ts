import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { CachedPermissionRepository } from './repositories/cached_permission.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [CacheModule],
  providers: [PermissionRepository, PermissionService, CachedPermissionRepository],
  exports: [PermissionRepository, PermissionService, CachedPermissionRepository],
})
export class AdminModule {}
