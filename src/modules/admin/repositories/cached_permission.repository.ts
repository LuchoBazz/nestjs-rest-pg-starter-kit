import { Injectable } from '@nestjs/common';

import { CacheSearcher, CacheService } from '../../../common/cache/cache.service';
import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { RoleCachePermissions } from '../../../entities/cache/permission_cache.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class CachedPermissionRepository implements CacheSearcher<PermissionEntity[]> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async search(session: PSQLSession, params: string[]): Promise<PermissionEntity[] | null> {
    try {
      return this.permissionRepository.getPermissionsByRole(session, { role: params[0] as UserRole });
    } catch (error) {
      return null;
    }
  }

  public async getPermissionsByRole(manager: PSQLSession, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    const parameter = new RoleCachePermissions(role);
    try {
      return this.cacheService.get(parameter, manager, this);
    } catch (error) {
      return [];
    }
  }
}
