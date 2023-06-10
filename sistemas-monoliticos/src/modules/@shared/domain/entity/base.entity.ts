import { Id } from "../value-object/id.value-object";

class BaseEntity {
  private _id: Id | undefined;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id?: Id) {
    this._id = id;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): Id | undefined {
    return this._id;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get createAt(): Date {
    return this._createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}

export { BaseEntity };
