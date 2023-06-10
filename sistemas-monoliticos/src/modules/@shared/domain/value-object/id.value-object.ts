import { ValueObject } from "./value-object.interface";
import { v4 as uuid } from "uuid";

class Id implements ValueObject {
  private _id: string | undefined;
  constructor(id?: string) {
    this._id = id || uuid();
  }

  get id(): string | undefined {
    return this._id;
  }
}

export { Id }
