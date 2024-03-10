import { BaseModel } from '../base.entity';

export class OrganizationEntity extends BaseModel {
  private _name: string;
  private _clientId: string;

  constructor(name: string, clientId: string) {
    super();
    this._name = name;
    this._clientId = clientId;
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

  public get clientId(): string {
    return this._clientId;
  }

  public set clientId(value: string) {
    this._clientId = value;
  }
}
