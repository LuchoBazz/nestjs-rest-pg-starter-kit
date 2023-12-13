import { BaseModel } from '../base.entity';
import { PageInfoResponse } from '../pagination.entity';

export interface ConfigurationParams {
  id: string;
  key: string;
  value: boolean;
  type: FeatureFlagType;
  is_active: boolean;
  organization_client_id: string;
  is_experimental: boolean;
}

export enum ConfigurationKey {
  AUTH_PROVIDER = 'AUTH_PROVIDER',
}

export enum FeatureFlagType {
  ENUM = 'ENUM',
  JSON = 'JSON',
}

export interface ConfigurationPaginationResponse {
  totalCount: number;
  items: ConfigurationEntity[];
  pageInfo: PageInfoResponse;
}

export class ConfigurationObject {
  id: string;
  key: string;
  value: boolean;
  type: FeatureFlagType;
  is_active: boolean;
  organization_client_id: string;
  is_experimental: boolean;
}

export class ConfigurationEntity extends BaseModel {
  private _key: string;
  private _value: boolean;
  private _type: FeatureFlagType;
  private _is_active: boolean;
  private _organization_client_id: string;
  private _is_experimental: boolean;

  constructor(params: ConfigurationParams) {
    super(params.id);
    this.key = params.key;
    this.value = params.value;
    this.is_active = params.is_active;
    this.organization_client_id = params.organization_client_id;
    this.is_experimental = params.is_experimental;
  }

  public static load(params: ConfigurationParams): ConfigurationEntity {
    return new ConfigurationEntity(params);
  }

  public static loadFromRow(row: any): ConfigurationEntity {
    return ConfigurationEntity.load({
      id: row.configuration_id,
      key: row.configuration_key,
      value: row.configuration_value,
      type: row.configuration_type,
      is_active: row.configuration_is_active,
      organization_client_id: row.configuration_organization,
      is_experimental: row.configuration_is_experimental,
    });
  }

  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
  }

  public get value(): boolean {
    return this._value;
  }

  public set value(value: boolean) {
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
