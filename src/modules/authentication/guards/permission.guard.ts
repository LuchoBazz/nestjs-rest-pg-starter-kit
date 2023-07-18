import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PoolClient } from 'pg';

import { ErrorValidator } from '../../../common/errors';
import { PermissionEntity } from '../../../entities/authentication';
import { PermissionsValues } from '../../../entities/authentication';
import { UserEntity } from '../../../entities/users';
import { PgGateway } from '../../../gateways/database/postgresql';
import { PermissionService } from '../../admin/services';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionService: PermissionService,
    private readonly pgGateway: PgGateway,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const permissions = this.reflector.get<PermissionsValues[]>('permissions', context.getHandler());
    const user = request.user as UserEntity;

    if (!permissions?.length || !user) {
      return true;
    }
    const permissionByRole = await this.pgGateway.onSession((manager: PoolClient) => {
      return this.permissionService.getPermissionsByRole(manager, { role: user.role });
    });

    const hasPermission = permissions.some((target: PermissionsValues) => {
      const found = permissionByRole.find((permission: PermissionEntity) => {
        return permission.name.toString() === target.toString();
      });
      return Boolean(found);
    });

    ErrorValidator.orThrowUnauthorizedError(hasPermission, 'USER_DOES_NOT_HAVE_A_ROLE_WITH_PERMISSIONS');

    return true;
  }
}
