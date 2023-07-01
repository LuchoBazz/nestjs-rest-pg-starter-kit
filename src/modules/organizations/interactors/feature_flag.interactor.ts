import { Injectable } from '@nestjs/common';

import { FeatureFlagPaginationResponse } from '../../../entities/organizations/feature_flag.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import { FeatureFlagsInput } from '../dto/feature_flag.dto';
import { FeatureFlagRepository } from '../repositories/feature_flag.repository';

@Injectable()
export class FeatureFlagInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly featFlagRepository: FeatureFlagRepository) {}

  public async foo(): Promise<boolean> {
    return true;
  }

  public async getFeatureFlags(input: FeatureFlagsInput): Promise<FeatureFlagPaginationResponse> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagRepository.findFeatureFlagsByOrganization(manager, { ...input });
    });
  }
}
