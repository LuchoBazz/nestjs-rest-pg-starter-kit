import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

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
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.featFlagService.findManyWithPagination(manager, { ...input, clientId });
    });
  }

  public async getFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.featFlagService.findOne(manager, { ...input, clientId });
    });
  }

  public async createFeatureFlag(clientId: string, input: CreateFeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.featFlagService.createOne(manager, { ...input, clientId });
    });
  }

  public async deleteFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<boolean> {
    return this.pgGateway.onTransaction((manager: PoolClient) => {
      return this.featFlagService.deleteOne(manager, { ...input, clientId });
    });
  }
}
