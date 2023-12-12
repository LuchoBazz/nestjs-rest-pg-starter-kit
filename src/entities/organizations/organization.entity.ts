import { BaseModel } from '../base.entity';

export interface OrganizationParams {
  name: string;
  client_id: string;
  alpha_user: number;
}

export class OrganizationEntity extends BaseModel {
  private _name: string;
  private _alpha_user: number;
  private _client_id: string;

  constructor(params: OrganizationParams) {
    super();
    this._name = params.name;
    this._client_id = params.client_id;
    this._alpha_user = params.alpha_user;
  }

  public static load(params: OrganizationParams): OrganizationEntity {
    return new OrganizationEntity(params);
  }

  public loadFromRow(row: any): OrganizationEntity {
    return OrganizationEntity.load({
      name: row.organization_name,
      client_id: row.organization_client_id,
      alpha_user: row.organization_alpha_user,
    });
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get client_id(): string {
    return this._client_id;
  }

  public set client_id(value: string) {
    this._client_id = value;
  }

  public get alpha_user(): number {
    return this._alpha_user;
  }

  public set alpha_user(value: number) {
    this._alpha_user = value;
  }
}
