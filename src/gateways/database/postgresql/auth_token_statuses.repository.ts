import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';

import { PSQLSession } from '.';

interface AuthTokenStatusesParams {
  user_id: string;
}

@Injectable()
export class AuthTokenStatuses {
  public async revoke(manager: PSQLSession, { user_id }: AuthTokenStatusesParams): Promise<boolean> {
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
}
