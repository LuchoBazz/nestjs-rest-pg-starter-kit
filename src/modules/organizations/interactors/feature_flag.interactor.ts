import { Injectable } from '@nestjs/common';

import { PaginationWithOrderByInput } from '../../../common/dto/pagination.dto';
import { FeatureFlagPaginationResponse } from '../../../entities/organizations/feature_flag.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import { FeatureFlagRepository } from '../repositories/feature_flag.repository';

@Injectable()
export class FeatureFlagInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly featFlagRepository: FeatureFlagRepository) {}

  public async foo(): Promise<boolean> {
    return true;
  }

  public async getFeatureFlags(
    clientId: string,
    input: PaginationWithOrderByInput,
  ): Promise<FeatureFlagPaginationResponse> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagRepository.findFeatureFlagsByOrganization(manager, { ...input, clientId });
    });
  }
}
