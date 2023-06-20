import { v1 as uuid } from 'uuid';

export abstract class BaseModel {
  private _id: string;

  constructor() {
    this._id = uuid.generate() as string;
  }

  public get id(): string {
    return this.id;
  }

  public set id(_id: string) {
    this._id = _id;
  }

  // public save(): void {}
}
