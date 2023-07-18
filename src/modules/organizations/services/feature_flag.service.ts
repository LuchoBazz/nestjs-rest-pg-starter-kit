import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { OrderBy, Pagination } from '../../../entities';
import { FeatureFlagEntity, FeatureFlagPaginationResponse, FeatureFlagType } from '../../../entities/organizations';
import { AuthProvider } from '../../../entities/users';
import { CachedFeatureFlagRepository, FeatureFlagRepository } from '../repositories';

interface InternalParams {
  clientId: string;
  key: string;
}

interface Params {
  clientId: string;
}

interface FindFFWithPagination {
  clientId: string;
  orderBy?: OrderBy;
  pagination?: Pagination;
}

interface CreateFeatureFlag {
  key: string;
  value: string | null;
  type: FeatureFlagType;
  is_experimental: boolean;
  clientId: string;
}

@Injectable()
export class FeatureFlagService {
  constructor(
    private readonly featFlagRepository: FeatureFlagRepository,
    private readonly cachedFeatFlagRepository: CachedFeatureFlagRepository,
  ) {}

  public async findFeatureFlag(manager: PoolClient, params: InternalParams): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.findFeatureFlag(manager, params);
  }

  public async findFeatureFlagsByOrganization(
    manager: PoolClient,
    params: FindFFWithPagination,
  ): Promise<FeatureFlagPaginationResponse> {
    return this.featFlagRepository.findFeatureFlagsByOrganization(manager, params);
  }

  public async createFeatureFlag(manager: PoolClient, params: CreateFeatureFlag): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.createFeatureFlag(manager, params);
  }

  public async deleteFeatureFlag(manager: PoolClient, params: InternalParams): Promise<boolean> {
    return this.featFlagRepository.deleteFeatureFlag(manager, params);
  }

  public async findAuthProvider(manager: PoolClient, params: Params): Promise<AuthProvider> {
    return this.cachedFeatFlagRepository.findAuthProvider(manager, params);
  }
}
