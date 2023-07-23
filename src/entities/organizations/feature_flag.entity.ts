import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../base.entity';
import { PageInfoResponse } from '../pagination.entity';

export interface FeatureFlagParams {
  id: string;
  key: string;
  value: string | null;
  is_active: boolean;
  type: FeatureFlagType;
  organization_client_id: string;
  is_experimental: boolean;
}

export enum FeatureFlagType {
  BOOLEAN = 'BOOLEAN',
  ENUM = 'ENUM',
  JSON = 'JSON',
}

export enum FeatureFlagKey {
  AUTH_PROVIDER = 'AUTH_PROVIDER',
}

export interface FeatureFlagPaginationResponse {
  totalCount: number;
  items: FeatureFlagEntity[];
  pageInfo: PageInfoResponse;
}

@ObjectType({ isAbstract: true })
export class FeatureFlagObject {
  @Field()
  id: string;
  @Field()
  key: string;
  @Field()
  value: string | null;
  @Field()
  is_active: boolean;
  @Field()
  type: FeatureFlagType;
  @Field()
  organization_client_id: string;
  @Field()
  is_experimental: boolean;
}

export class FeatureFlagEntity extends BaseModel {
  private _key: string;
  private _value: string | null;
  private _is_active: boolean;
  private _type: FeatureFlagType;
  private _organization_client_id: string;
  private _is_experimental: boolean;

  constructor(params: FeatureFlagParams) {
    super(params.id);
    this.key = params.key;
    this.value = params.value;
    this.is_active = params.is_active;
    this.type = params.type;
    this.organization_client_id = params.organization_client_id;
    this.is_experimental = params.is_experimental;
  }

  public static load(params: FeatureFlagParams): FeatureFlagEntity {
    return new FeatureFlagEntity(params);
  }

  // deno-lint-ignore no-explicit-any
  public static loadFromRow(row: any): FeatureFlagEntity {
    return FeatureFlagEntity.load({
      id: row.feature_flag_id,
      key: row.feature_flag_key,
      value: row.feature_flag_value,
      is_active: row.feature_flag_is_active,
      type: row.feature_flag_type,
      organization_client_id: row.feature_flag_organization,
      is_experimental: row.feature_flag_is_experimental,
    });
  }

  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
  }

  public get value(): string | null {
    return this._value;
  }

  public set value(value: string | null) {
    this._value = value;
  }

  public get is_active(): boolean {
    return this._is_active;
  }

  public set is_active(value: boolean) {
    this._is_active = value;
  }

  public get type(): FeatureFlagType {
    return this._type;
  }

  public set type(value: FeatureFlagType) {
    this._type = value;
  }

  public get organization_client_id(): string {
    return this._organization_client_id;
  }

  public set organization_client_id(value: string) {
    this._organization_client_id = value;
  }

  public get is_experimental(): boolean {
    return this._is_experimental;
  }

  public set is_experimental(value: boolean) {
    this._is_experimental = value;
  }
}
