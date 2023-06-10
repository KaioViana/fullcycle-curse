import { Product } from "../domain/product.entity";

interface ProductGateway {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}

export { ProductGateway }
