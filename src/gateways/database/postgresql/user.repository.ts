import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';

import { UserEntity } from '../../../entities/users.entity';
import { PSQLSession } from '.';

interface UserFindUserByEmailParams {
  email: string;
  clientId: string;
}

interface UserCreateParams {
  user: UserEntity;
}

@Injectable()
export class UserRepository {
  public async findUserByEmail(
    manager: PSQLSession,
    { email, clientId }: UserFindUserByEmailParams,
  ): Promise<UserEntity> {
    try {
      const query = format(
        `
          SELECT
            user_id,
            user_username,
            user_first_name,
            user_last_name,
            user_email,
            user_terms,
            user_notifications,
            user_is_active,
            user_uid,
            user_role,
            user_auth_provider,
            user_auth_type,
            user_organization,
            user_created_at,
            user_updated_at,
            user_dynamic_info
          FROM core.users users
          WHERE users.user_email = %1$L AND users.user_organization = %2$L
        `,
        email,
        clientId,
      );
      const { rows } = await manager.query(query);
      return UserEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
  }

  public async createUser(manager: PSQLSession, { user }: UserCreateParams): Promise<UserEntity> {
    try {
      const query = format(
        `
        INSERT INTO core.users (
          user_id,
          user_username,
          user_first_name,
          user_last_name,
          user_email,
          user_terms,
          user_notifications,
          user_is_active,
          user_uid,
          user_role,
          user_auth_provider,
          user_auth_type,
          user_organization,
          user_dynamic_info
        ) VALUES(
          %1$L, %2$L, %3$L, %4$L, %5$L, %6$L, %7$L, %8$L, %9$L, %10$L, %11$L, %12$L, %13$L, %14$L::jsonb
        )
        RETURNING *
        `,
        user.id,
        user.username,
        user.first_name,
        user.last_name,
        user.email,
        String(user.terms),
        String(user.notifications),
        String(user.is_active),
        user.uid,
        user.role,
        user.auth_provider,
        user.auth_type,
        user.organization_client_id,
        JSON.stringify(user.dynamic_info),
      );
      const { rows } = await manager.query(query);
      return UserEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('USER_COULD_NOT_BE_CREATED');
    }
  }

  public async delete(manager: PSQLSession, { user }: UserCreateParams): Promise<boolean> {
    try {
      const query = format(
        `
          DELETE FROM core.users
          WHERE user_id = %1$L AND user_organization = %2$L;
        `,
        user.id,
        user.organization_client_id,
      );
      const response = await manager.query(query);
      return Boolean(response);
    } catch (error) {
      throw new NotFoundException('USER_COULD_NOT_BE_DELETED');
    }
  }
}
