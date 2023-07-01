import { Injectable } from '@nestjs/common';

import { PgGateway } from '../../../gateways/database/postgresql';
import { FeatureFlagRepository } from '../../../gateways/database/postgresql/feature-flag.repository';

@Injectable()
export class FeatureFlagInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly featFlagRepository: FeatureFlagRepository) {}

  public async foo(): Promise<boolean> {
    return true;
  }
}
