import { ValueObject } from "./value-object.interface";

class Address implements ValueObject {
  private _address: string;

  constructor(address: string) {
    this._address = address;
  }

  get address(): string {
    return this._address;
  }
}

export { Address };
