import { BaseModel } from '../base.entity';
import { PageInfoResponse } from '../pagination.entity';
export interface FeatureFlagPaginationResponse {
  totalCount: number;
  items: FeatureFlagEntity[];
  pageInfo: PageInfoResponse;
}

export class FeatureFlagResponse {
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

  constructor(
    id: string,
    key: string,
    value: boolean,
    percentage: number,
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

  public static loadFromRow(row: any): FeatureFlagEntity {
    return new FeatureFlagEntity(
      row.feature_flag_id,
      row.feature_flag_key,
      row.feature_flag_value,
      row.feature_flag_percentage,
      row.feature_flag_is_active,
      row.feature_flag_organization,
      row.feature_flag_is_experimental,
    );
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
