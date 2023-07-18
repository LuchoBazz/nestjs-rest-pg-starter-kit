import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { CacheService } from '../../../common/cache';
import { PermissionEntity } from '../../../entities/authentication';
import { RoleCachePermissions } from '../../../entities/cache';
import { UserRole } from '../../../entities/users';
import { PermissionRepository } from '../repositories';

@Injectable()
export class CachedPermissionService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async getPermissionsByRole(manager: PoolClient, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    const parameter = new RoleCachePermissions(role);
    try {
      const searcher = (manager: PoolClient, params: string[]): Promise<PermissionEntity[] | null> => {
        return this.permissionRepository.getPermissionsByRole(manager, { role: params[0] as UserRole });
      };
      return this.cacheService.get(parameter, manager, searcher);
    } catch (error) {
      return [];
    }
  }
}
