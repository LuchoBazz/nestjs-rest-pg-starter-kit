import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { CacheService } from '../../../common/cache';
import { PermissionEntity, PermissionsValues } from '../../../entities/authentication';
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
      const searcher = async (manager: PoolClient, params: string[]): Promise<PermissionEntity[]> => {
        const permissions = await this.permissionRepository.getPermissionsByRole(manager, {
          role: params[0] as UserRole,
        });
        if (!permissions?.length) {
          return [new PermissionEntity(PermissionsValues.GUEST_USER)];
        }
        return permissions;
      };
      return this.cacheService.get(parameter, manager, searcher);
    } catch (error) {
      return [];
    }
  }
}
