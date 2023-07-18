import { Injectable } from '@nestjs/common';

import {
  FeatureFlagEntity,
  FeatureFlagPaginationResponse,
  FeatureFlagType,
} from '../../../entities/organizations/feature_flag.entity';
import { OrderBy, Pagination } from '../../../entities/pagination.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
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

  public async findFeatureFlag(manager: PSQLSession, params: InternalParams): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.findFeatureFlag(manager, params);
  }

  public async findFeatureFlagsByOrganization(
    manager: PSQLSession,
    params: FindFFWithPagination,
  ): Promise<FeatureFlagPaginationResponse> {
    return this.featFlagRepository.findFeatureFlagsByOrganization(manager, params);
  }

  public async createFeatureFlag(manager: PSQLSession, params: CreateFeatureFlag): Promise<FeatureFlagEntity> {
    return this.featFlagRepository.createFeatureFlag(manager, params);
  }

  public async deleteFeatureFlag(manager: PSQLSession, params: InternalParams): Promise<boolean> {
    return this.featFlagRepository.deleteFeatureFlag(manager, params);
  }

  public async findAuthProvider(manager: PSQLSession, params: Params): Promise<AuthProvider> {
    return this.cachedFeatFlagRepository.findAuthProvider(manager, params);
  }
}
