import { BaseModel } from '../base.entity';

export class OrganizationEntity extends BaseModel {
  private _name: string;
  private _client_id: string;

  constructor(name: string, client_id: string) {
    super();
    this._name = name;
    this._client_id = client_id;
  }

  public loadFromRow(row: any): OrganizationEntity {
    return new OrganizationEntity(row.organization_name, row.organization_client_id);
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
}
