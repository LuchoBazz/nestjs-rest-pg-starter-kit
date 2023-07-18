import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { OrderBy, Pagination } from '../../../entities';
import { FeatureFlagEntity, FeatureFlagPaginationResponse, FeatureFlagType } from '../../../entities/organizations';
import { AuthProvider } from '../../../entities/users';
import { CachedFeatureFlagService, FeatureFlagRepository } from '../repositories';

@Injectable()
export class FeatureFlagService {
  constructor(
    private readonly featFlagRepository: FeatureFlagRepository,
    private readonly cachedFeatFlagService: CachedFeatureFlagService,
  ) {}

  public async findFeatureFlag(
    manager: PoolClient,
    params: { clientId: string; key: string },
  ): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.findFeatureFlag(manager, params);
  }

  public async findFeatureFlagsByOrganization(
    manager: PoolClient,
    params: { clientId: string; orderBy?: OrderBy; pagination?: Pagination },
  ): Promise<FeatureFlagPaginationResponse> {
    return this.featFlagRepository.findFeatureFlagsByOrganization(manager, params);
  }

  public async createFeatureFlag(
    manager: PoolClient,
    params: { key: string; value: string | null; type: FeatureFlagType; is_experimental: boolean; clientId: string },
  ): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.createFeatureFlag(manager, params);
  }

  public async deleteFeatureFlag(manager: PoolClient, params: { clientId: string; key: string }): Promise<boolean> {
    return this.featFlagRepository.deleteFeatureFlag(manager, params);
  }

  public async findAuthProvider(manager: PoolClient, params: { clientId: string }): Promise<AuthProvider> {
    return this.cachedFeatFlagService.findAuthProvider(manager, params);
  }
}
