import * as NodeCache from 'node-cache';

import { PSQLSession } from '.';

export abstract class CacheParameters {
  public abstract generateKey(): string;
  public abstract getSearchValues(): string[];
}

export abstract class CacheSearcher<T> {
  public abstract search(session: PSQLSession, params: string[]): Promise<T | undefined>;
}

export class OrganizationCacheParameters extends CacheParameters {
  private clientId: string;
  private paramKey: string;

  public constructor(clientId: string, paramKey: string) {
    super();
    this.clientId = clientId;
    this.paramKey = paramKey;
  }

  public generateKey(): string {
    return `${this.getClientId()}-${this.getParamKey()}`;
  }

  public getSearchValues(): string[] {
    return [this.getClientId(), this.getParamKey()];
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getParamKey(): string {
    return this.paramKey;
  }
}

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
  ): Promise<T | undefined> {
    const key = parameters.generateKey();
    const value = this.cache.get<T>(key);

    if (value || !searcher) {
      return value;
    }

    const newValue = await searcher.search(session, parameters.getSearchValues());
    this.cache.set(key, newValue, 3600);
    return newValue;
  }

  public delete(keys: NodeCache.Key[]) {
    this.cache.del(keys);
  }
}
