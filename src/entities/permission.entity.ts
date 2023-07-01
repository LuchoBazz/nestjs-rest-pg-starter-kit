import { BaseModel } from './base.entity';

export interface PermissionParams {
  name: string;
}

export class PermissionEntity extends BaseModel {
  private _name: string;

  constructor(params: PermissionParams) {
    super();
    this.name = params.name;
  }

  public static load(params: PermissionParams): PermissionEntity {
    return new PermissionEntity(params);
  }

  // deno-lint-ignore no-explicit-any
  public static loadFromRow(row: any): PermissionEntity {
    return PermissionEntity.load({
      name: row.permission_name,
    });
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}
