import Address from "../../customer/value-object/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;

    this.validate();
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
