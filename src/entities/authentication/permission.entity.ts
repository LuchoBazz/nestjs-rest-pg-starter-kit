import { BaseModel } from '../base.entity';

export class PermissionEntity extends BaseModel {
  private _name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public static loadFromRow(row: any): PermissionEntity {
    return new PermissionEntity(row.permission_name);
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}
