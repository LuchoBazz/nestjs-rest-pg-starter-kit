import { Injectable } from '@nestjs/common';

import { FeatureFlagObject, FeatureFlagPaginationResponse } from '../../../entities/organizations/feature_flag.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import { CreateFeatureFlagInput, FeatureFlagInput, FeatureFlagPaginationInput } from '../dto/feature_flag.dto';
import { FeatureFlagRepository } from '../repositories/feature_flag.repository';

@Injectable()
export class FeatureFlagInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly featFlagRepository: FeatureFlagRepository) {}

  public async foo(): Promise<boolean> {
    return true;
  }

  public async getFeatureFlags(
    clientId: string,
    input: FeatureFlagPaginationInput,
  ): Promise<FeatureFlagPaginationResponse> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagRepository.findFeatureFlagsByOrganization(manager, { ...input, clientId });
    });
  }

  public async getFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagRepository.findFeatureFlag(manager, { ...input, clientId });
    });
  }

  public async createFeatureFlag(clientId: string, input: CreateFeatureFlagInput): Promise<FeatureFlagObject> {
    return this.pgGateway.onSession((manager) => {
      return this.featFlagRepository.createFeatureFlag(manager, { ...input, clientId });
    });
  }

  public async deleteFeatureFlag(clientId: string, input: FeatureFlagInput): Promise<boolean> {
    return this.pgGateway.onTransaction((manager) => {
      return this.featFlagRepository.deleteFeatureFlag(manager, { ...input, clientId });
    });
  }
}
