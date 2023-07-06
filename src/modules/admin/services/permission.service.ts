import { Injectable } from '@nestjs/common';

import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { CachedPermissionRepository } from '../repositories/cached_permission.repository';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly cachedPermissionRepository: CachedPermissionRepository,
  ) {}

  public async getPermissionsByRole(manager: PSQLSession, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    return this.cachedPermissionRepository.getPermissionsByRole(manager, { role });
  }

  public async addPermissionToRole(
    manager: PSQLSession,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    return this.permissionRepository.addPermissionToRole(manager, { role, permissionName });
  }

  public async deletePermissionToRole(
    manager: PSQLSession,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    return this.permissionRepository.deletePermissionToRole(manager, { role, permissionName });
  }
}
