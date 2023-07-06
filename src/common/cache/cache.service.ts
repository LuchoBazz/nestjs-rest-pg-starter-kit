import { Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';

import { CacheParameters } from '../../entities/cache/organization_parameters_cache.entity';
import { PSQLSession } from '../../gateways/database/postgresql';

export abstract class CacheSearcher<T> {
  public abstract search(session: PSQLSession, params: string[]): Promise<T | null>;
}

@Injectable()
export class CacheService {
  private readonly cache: NodeCache;

  public constructor() {
    const ttlSeconds = 3600;
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  public async get<T>(
    parameters: CacheParameters,
    session: PSQLSession,
    searcher?: CacheSearcher<T>,
  ): Promise<T | null> {
    const key = parameters.generateKey();
    const value = this.cache.get<T>(key);

    if (value || !searcher) {
      return value;
    }

    const newValue = await searcher.search(session, parameters.getSearchValues());
    this.cache.set(key, newValue);
    return newValue;
  }

  public delete(keys: NodeCache.Key[]) {
    this.cache.del(keys);
  }
}
