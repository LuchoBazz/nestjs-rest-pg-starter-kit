import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { FeatureFlagEntity, FeatureFlagPaginationResponse } from '../../../entities/organizations';
import { AuthProvider } from '../../../entities/users';
import {
  CreateFeatureFlagInput,
  FeatureFlagPaginationInput,
  FilterFeatureFlagInput,
  UpdateFeatureFlagInput,
} from '../dto';
import { CachedFeatureFlagService, FeatureFlagRepository } from '../repositories';

@Injectable()
export class FeatureFlagService {
  constructor(
    private readonly featFlagRepository: FeatureFlagRepository,
    private readonly cachedFeatFlagService: CachedFeatureFlagService,
  ) {}

  public async findOne(
    manager: PoolClient,
    params: FilterFeatureFlagInput & { clientId: string },
  ): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.findOne(manager, params);
  }

  public async findManyWithPagination(
    manager: PoolClient,
    params: FeatureFlagPaginationInput & { clientId: string },
  ): Promise<FeatureFlagPaginationResponse> {
    return this.featFlagRepository.findManyWithPagination(manager, params);
  }

  public async createOne(
    manager: PoolClient,
    params: CreateFeatureFlagInput & { clientId: string },
  ): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.createOne(manager, params);
  }

  public async updateOne(
    manager: PoolClient,
    params: UpdateFeatureFlagInput & { clientId: string },
  ): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.updateOne(manager, params);
  }

  public async deleteOne(manager: PoolClient, params: FilterFeatureFlagInput & { clientId: string }): Promise<boolean> {
    return this.featFlagRepository.deleteOne(manager, params);
  }

  public async findAuthProvider(manager: PoolClient, params: { clientId: string }): Promise<AuthProvider> {
    return this.cachedFeatFlagService.findAuthProvider(manager, params);
  }
}
