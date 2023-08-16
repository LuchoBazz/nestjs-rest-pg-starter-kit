import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { PoolClient } from 'pg';

import { formatFields } from '../../../common/utils/format.postgresql';
import { UserEntity } from '../../../entities/users';
import { UpdateUser } from '../dto';

@Injectable()
export class UserRepository {
  public async findOneByEmail(
    manager: PoolClient,
    { email, clientId }: { email: string; clientId: string },
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
            user_identification_number,
            user_phone_number,
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

  public async createOne(manager: PoolClient, { user }: { user: UserEntity }): Promise<UserEntity> {
    try {
      const query = format(
        `
          INSERT INTO core.users (
            user_id,
            user_username,
            user_first_name,
            user_last_name,
            user_email,
            user_identification_number,
            user_phone_number,
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
            %1$L, %2$L, %3$L, %4$L, %5$L, %6$L, %7$L, %8$L, %9$L, %10$L, %11$L, %12$L, %13$L, %14$L, %15$L, %16$L::jsonb
          )
          RETURNING *
        `,
        user.id,
        user.username,
        user.first_name,
        user.last_name,
        user.email,
        user.identification_number,
        user.phone_number,
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

  public async updateOne(
    manager: PoolClient,
    { clientId, email, user }: { clientId: string; email: string; user: UpdateUser },
  ): Promise<UserEntity> {
    try {
      const fields = formatFields({
        updateData: user,
        columnName: {
          username: 'user_username',
          firstName: 'user_first_name',
          lastName: 'user_last_name',
          email: 'user_email',
          identificationNumber: 'user_identification_number',
          phoneNumber: 'user_phone_number',
          terms: 'user_terms',
          notifications: 'user_notifications',
        },
      });

      const query = format(
        `
          UPDATE core.users
          SET ${fields}
          WHERE users.user_email = %1$L AND users.user_organization = %2$L
        `,
        email,
        clientId,
      );
      const { rows } = await manager.query(query);
      return UserEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('USER_COULD_NOT_BE_UPDATED');
    }
  }

  public async deleteOne(manager: PoolClient, { user }: { user: UserEntity }): Promise<boolean> {
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
