import { BaseModel } from '../base.entity';
import { PageInfoResponse } from '../pagination.entity';

export enum ConfigurationKey {
  AUTH_PROVIDER = 'AUTH_PROVIDER',
}

export enum ConfigurationType {
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
  value: string;
  type: ConfigurationType;
  is_active: boolean;
  organization_client_id: string;
  is_experimental: boolean;
}

export class ConfigurationEntity extends BaseModel {
  private _key: string;
  private _value: string;
  private _type: ConfigurationType;
  private _is_active: boolean;
  private _organization_client_id: string;
  private _is_experimental: boolean;

  constructor(
    id: string,
    key: string,
    value: string,
    type: ConfigurationType,
    is_active: boolean,
    organization_client_id: string,
    is_experimental: boolean,
  ) {
    super(id);
    this.key = key;
    this.value = value;
    this.is_active = is_active;
    this.organization_client_id = organization_client_id;
    this.is_experimental = is_experimental;
  }

  public static loadFromRow(row: any): ConfigurationEntity {
    return new ConfigurationEntity(
      row.configuration_id,
      row.configuration_key,
      row.configuration_value,
      row.configuration_type,
      row.configuration_is_active,
      row.configuration_organization,
      row.configuration_is_experimental,
    );
  }

  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public get is_active(): boolean {
    return this._is_active;
  }

  public set is_active(value: boolean) {
    this._is_active = value;
  }

  public get type(): ConfigurationType {
    return this._type;
  }

  public set type(value: ConfigurationType) {
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
