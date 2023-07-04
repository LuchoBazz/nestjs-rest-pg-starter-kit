import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PgGateway, PSQLSession } from '../gateways/database/postgresql';
import { AuthTokenStatusesRepository } from '../modules/authentication/repositories/auth_token_statuses.repository';

@Injectable()
export class ClearExpiredTokensScheduler {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly authTokenStatusesRepository: AuthTokenStatusesRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    timeZone: 'America/Bogota',
  })
  public async handleCron(): Promise<void> {
    await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      await this.authTokenStatusesRepository.clearExpiredTokens(manager);
    });
  }
}
