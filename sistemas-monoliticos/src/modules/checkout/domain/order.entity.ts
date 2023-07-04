import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object"
import { ClientEntity } from "./client.entity"
import { ProductEntity } from "./product.entity"

type OrderProps = {
  id?: Id,
  client: ClientEntity,
  products: ProductEntity[],
  status?: string;
}

class OrderEntity extends BaseEntity {
  private _client: ClientEntity;
  private _products: ProductEntity[];
  private _status?: string;

  constructor(props: OrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || 'pending';
  }

  approve(): void {
    this._status = 'approved';
  }

  get client(): ClientEntity {
    return this._client;
  }

  get products(): ProductEntity[] {
    return this._products;
  }

  get status(): string {
    return this._status;
  }

  get total(): number {
    return this._products.reduce((acc, product) => {
      return acc + product.salesPrice;
    }, 0);
  }
}

export { OrderEntity }
