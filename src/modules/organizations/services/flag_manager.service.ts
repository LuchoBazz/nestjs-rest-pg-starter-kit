import { BadRequestException, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { FeatureFlagType } from '../../../entities/organizations';
import { PgGateway } from '../../../gateways/database/postgresql';
import { FindFlagManagerDTO } from '../dto/flag_manager.dto';
import { CachedFeatureFlagService } from './cached_feature_flag.service';

@Injectable()
export class FeatureFlagManagerService {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly cachedFeatureFlag: CachedFeatureFlagService,
  ) {}

  public async findFeatureFlag({
    clientId,
    key,
    userId,
    type = FeatureFlagType.PERCENTAGE,
  }: FindFlagManagerDTO & { type: FeatureFlagType }): Promise<boolean> {
    if (type == FeatureFlagType.PERCENTAGE) {
      return await this.findFeatureFlagByPercentage({ clientId, key, userId });
    }
    if (type == FeatureFlagType.LOCATION) {
      return await this.findFeatureFlagByLocation({ clientId, key, userId });
    }
    throw new BadRequestException('FEATURE_FLAG_TYPE_IS_WRONG');
  }

  private async findFeatureFlagByPercentage({ clientId, key, userId }: FindFlagManagerDTO): Promise<boolean> {
    const featureFlag = await this.pgGateway.onSession(async (manager: PoolClient) => {
      return await this.cachedFeatureFlag.findOne(manager, { clientId, key });
    });
    const userHash = this.getHashCyrb53(userId);
    const remainder = userHash % 100;
    return Boolean(featureFlag) && remainder <= featureFlag.percentage;
  }

  private async findFeatureFlagByLocation({}: FindFlagManagerDTO): Promise<boolean> {
    return Promise.resolve(false);
  }

  private getHashCyrb53(str: string, seed = 1000000007): number {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
}
