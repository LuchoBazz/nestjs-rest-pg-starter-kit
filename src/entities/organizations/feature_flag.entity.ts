import { BaseModel } from '../base.entity';
import { PageInfoResponse } from '../pagination.entity';

export interface FeatureFlagParams {
  id: string;
  key: string;
  value: boolean;
  percentage: number;
  is_active: boolean;
  organization_client_id: string;
  is_experimental: boolean;
}

export interface FeatureFlagPaginationResponse {
  totalCount: number;
  items: FeatureFlagEntity[];
  pageInfo: PageInfoResponse;
}

export class FeatureFlagObject {
  id: string;
  key: string;
  value: boolean;
  percentage: number;
  is_active: boolean;
  organization_client_id: string;
  is_experimental: boolean;
}

export class FeatureFlagEntity extends BaseModel {
  private _key: string;
  private _value: boolean;
  private _percentage: number;
  private _is_active: boolean;
  private _organization_client_id: string;
  private _is_experimental: boolean;

  constructor(params: FeatureFlagParams) {
    super(params.id);
    this.key = params.key;
    this.value = params.value;
    this.is_active = params.is_active;
    this.organization_client_id = params.organization_client_id;
    this.is_experimental = params.is_experimental;
  }

  public static load(params: FeatureFlagParams): FeatureFlagEntity {
    return new FeatureFlagEntity(params);
  }

  public static loadFromRow(row: any): FeatureFlagEntity {
    return FeatureFlagEntity.load({
      id: row.feature_flag_id,
      key: row.feature_flag_key,
      value: row.feature_flag_value,
      percentage: row.feature_flag_percentage,
      is_active: row.feature_flag_is_active,
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

  public get percentage(): number {
    return this._percentage;
  }

  public set percentage(value: number) {
    this._percentage = value;
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
