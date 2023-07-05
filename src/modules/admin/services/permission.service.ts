import { Injectable } from '@nestjs/common';

import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { PermissionRepository } from '../repositories/permission.repository';

interface PermissionServiceParams {
  role: UserRole;
}

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  public async getPermissionsByRole(
    manager: PSQLSession,
    { role }: PermissionServiceParams,
  ): Promise<PermissionEntity[]> {
    return this.permissionRepository.getPermissionsOf(manager, { role });
  }
}
