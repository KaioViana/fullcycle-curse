import { Product } from "../domain/product.entity";

interface IProductGateway {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}

export { IProductGateway }
