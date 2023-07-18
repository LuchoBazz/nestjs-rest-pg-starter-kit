import { Injectable } from '@nestjs/common';

import { CacheService } from '../../../common/cache';
import { PermissionEntity } from '../../../entities/authentication';
import { RoleCachePermissions } from '../../../entities/cache';
import { UserRole } from '../../../entities/users';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { PermissionRepository } from '.';

@Injectable()
export class CachedPermissionRepository {
  constructor(
    private readonly cacheService: CacheService,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async getPermissionsByRole(manager: PSQLSession, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    const parameter = new RoleCachePermissions(role);
    try {
      const searcher = (session: PSQLSession, params: string[]): Promise<PermissionEntity[] | null> => {
        return this.permissionRepository.getPermissionsByRole(session, { role: params[0] as UserRole });
      };
      return this.cacheService.get(parameter, manager, searcher);
    } catch (error) {
      return [];
    }
  }
}
