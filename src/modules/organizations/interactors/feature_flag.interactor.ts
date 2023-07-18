import { Injectable } from '@nestjs/common';

import { FeatureFlagObject, FeatureFlagPaginationResponse } from '../../../entities/organizations';
import { PgGateway } from '../../../gateways/database/postgresql';
import { CreateFeatureFlagInput, FeatureFlagInput, FeatureFlagPaginationInput } from '../dto';
import { FeatureFlagService } from '../services';

@Injectable()
export class FeatureFlagInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly featFlagService: FeatureFlagService) {}

  public async getFeatureFlags(
    clientId: string,
    input: FeatureFlagPaginationInput,
  ): Promise<FeatureFlagPaginationResponse> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagService.findFeatureFlagsByOrganization(manager, { ...input, clientId });
    });
  }

  public async getFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagService.findFeatureFlag(manager, { ...input, clientId });
    });
  }

  public async createFeatureFlag(clientId: string, input: CreateFeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagService.createFeatureFlag(manager, { ...input, clientId });
    });
  }

  public async deleteFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<boolean> {
    return this.pgGateway.onTransaction((manager) => {
      return this.featFlagService.deleteFeatureFlag(manager, { ...input, clientId });
    });
  }
}
