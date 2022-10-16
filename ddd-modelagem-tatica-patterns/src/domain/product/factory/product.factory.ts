import Product from "../entity/product";
import { ProductInterface } from "../entity/product.interface";
import { v4 as uuid } from 'uuid'
import ProductB from "../entity/product-b";

class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    if (type === 'b') {
      return new ProductB(uuid(), name, price);
    }
    return new Product(uuid(), name, price);
  }
}

export { ProductFactory }
