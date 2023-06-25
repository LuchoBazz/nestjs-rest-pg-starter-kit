import { v4 as uuid } from 'uuid';

export class BaseModel {
  private _id: string;

  constructor(id?: string) {
    this._id = id ?? uuid();
  }

  public get id(): string {
    return this._id;
  }

  public set id(_id: string) {
    this._id = _id;
  }

  // public save(): void {}
}
