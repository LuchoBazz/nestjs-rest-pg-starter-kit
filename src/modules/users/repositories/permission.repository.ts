import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';

import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';

interface PermissionRepositoryParams {
  role: UserRole;
}

@Injectable()
export class PermissionRepository {
  public async getPermissionsByRole(
    manager: PSQLSession,
    { role }: PermissionRepositoryParams,
  ): Promise<PermissionEntity[]> {
    try {
      const query = format(
        `
          SELECT
            permission_id,
            permission_name
          FROM core.roles
          INNER JOIN core.permissions
          ON permissions.permission_role = roles.role_name  
          WHERE roles.role_name = %1$L
        `,
        role.toString(),
      );
      const { rows } = await manager.query(query);
      return rows.map(PermissionEntity.loadFromRow);
    } catch (error) {
      throw new NotFoundException('PERMISSIONS_NOT_FOUND');
    }
  }
}
