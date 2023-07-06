import { Id } from "../value-object/id.value-object";

class BaseEntity {
  private _id: Id | undefined;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
    this._id = id || new Id();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id(): Id | undefined {
    return this._id;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}

export { BaseEntity };
