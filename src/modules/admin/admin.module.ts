import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [CacheModule],
  providers: [PermissionRepository, PermissionService],
  exports: [PermissionRepository, PermissionService],
})
export class AdminModule {}
