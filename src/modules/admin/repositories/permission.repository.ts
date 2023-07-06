import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { v4 as uuid } from 'uuid';

import { PermissionEntity } from '../../../entities/authentication/permission.entity';
import { UserRole } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';

@Injectable()
export class PermissionRepository {
  public async getPermissionsByRole(manager: PSQLSession, { role }: { role: UserRole }): Promise<PermissionEntity[]> {
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

  public async addPermissionToRole(
    manager: PSQLSession,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    try {
      const query = format(
        `
          INSERT INTO core.permissions (
            permission_id,
            permission_role,
            permission_name,
          ) VALUES(%1$L, %2$L, %3$L);
        `,
        uuid(),
        role.toString(),
        permissionName,
      );
      const { rows } = await manager.query(query);
      return PermissionEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('PERMISSION_COULD_NOT_BE_CREATED');
    }
  }

  public async deletePermissionToRole(
    manager: PSQLSession,
    { role, permissionName }: { role: string; permissionName: string },
  ): Promise<PermissionEntity> {
    try {
      const query = format(
        `
          DELETE FROM core.permissions
          WHERE permission_role = %1$L AND permission_name = %2$L;
        `,
        role.toString(),
        permissionName,
      );
      const { rows } = await manager.query(query);
      return PermissionEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('PERMISSION_COULD_NOT_BE_DELETED');
    }
  }
}
