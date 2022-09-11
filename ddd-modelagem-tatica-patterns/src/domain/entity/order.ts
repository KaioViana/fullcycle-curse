import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items
  }

  addOrderItem(orderItem: OrderItem): void {
    this._items.push(orderItem);
    this._total = this.total();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("Customer id is required");
    }

    if (this._items.length <= 0) {
      throw new Error("A order expects a least one item");
    }
    return true
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + (item.total()), 0)
  }
}
