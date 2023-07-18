import postgresql from '@mercadoni/elementals/postgresql';
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

const entityPostgreSQL = postgresql('postgresql');

@Injectable()
export class PgGateway {
  public async newSession(): Promise<PoolClient> {
    return entityPostgreSQL.newSession();
  }

  public closeSession(session: PoolClient): void {
    return entityPostgreSQL.closeSession(session);
  }

  public async onSession<T>(operation: (session: PoolClient) => Promise<T>): Promise<T> {
    return entityPostgreSQL.onSession<T>(operation);
  }

  public async onTransaction<T>(operation: (session: PoolClient) => Promise<T>): Promise<T> {
    return entityPostgreSQL.onTransaction<T>(operation);
  }

  public async closePool(): Promise<void> {
    return entityPostgreSQL.closePool();
  }
}
