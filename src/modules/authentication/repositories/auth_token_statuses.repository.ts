import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import moment from 'moment-timezone';
import { PoolClient } from 'pg';

@Injectable()
export class AuthTokenStatusesRepository {
  public async revoke(manager: PoolClient, { user_id }: { user_id: string }): Promise<boolean> {
    try {
      const query = format(
        `
          DELETE FROM core.auth_token_statuses
            WHERE auth_token_user = %1$L;  
        `,
        user_id,
      );
      const deleted = await manager.query(query);
      return Boolean(deleted);
    } catch (error) {
      throw new NotFoundException('AUTH_TOKEN_STATUSES_NOT_FOUND');
    }
  }

  public async clearExpiredTokens(manager: PoolClient): Promise<boolean> {
    const now = moment().tz('America/Bogota').toDate();
    const unixTime = Math.floor(now.getTime() / 1000);

    try {
      const query = format(
        `
          DELETE FROM core.auth_token_statuses
            WHERE auth_token_statuses.auth_token_expiration_time < %1$L;  
        `,
        unixTime,
      );
      const deleted = await manager.query(query);
      return Boolean(deleted);
    } catch (error) {
      throw new NotFoundException('AUTH_TOKEN_STATUSES_COULD_NOT_BE_REMOVED');
    }
  }
}
