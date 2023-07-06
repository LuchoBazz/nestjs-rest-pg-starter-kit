import { Injectable } from '@nestjs/common';

import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  public async getPermissionsByRole(manager: PSQLSession, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
    return this.permissionRepository.getPermissionsOf(manager, { role });
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
