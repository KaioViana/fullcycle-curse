import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Address } from "../../@shared/domain/value-object/address.value-object";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductEntity } from "./product.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: ProductEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}

class InvoiceEntity extends BaseEntity {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: ProductEntity[];
  private _total = 0;

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this.setTotal();
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): ProductEntity[] {
    return this._items;
  }

  get total(): number {
    return this._total;
  }

  private setTotal(): void {
    let total = this._total;
    this._items.forEach((item: ProductEntity) => {
      total += item.price;
    });

    this._total = total;
  }
}

export { InvoiceEntity };
