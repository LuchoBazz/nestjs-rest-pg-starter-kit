import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { PermissionEntity } from '../../../entities/authentication';
import { UserRole } from '../../../entities/users';
import { CachedPermissionRepository, PermissionRepository } from '../repositories';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly cachedPermissionRepository: CachedPermissionRepository,
  ) {}

  public async getPermissionsByRole(manager: PoolClient, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    return this.cachedPermissionRepository.getPermissionsByRole(manager, { role });
  }

  public async addPermissionToRole(
    manager: PoolClient,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    return this.permissionRepository.addPermissionToRole(manager, { role, permissionName });
  }

  public async deletePermissionToRole(
    manager: PoolClient,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    return this.permissionRepository.deletePermissionToRole(manager, { role, permissionName });
  }
}
