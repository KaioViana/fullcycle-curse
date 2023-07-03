import { IDatabase } from "../../@shared/infra/database/database.interface";
import { Product } from "../domain/product.entity";
import { IProductGateway } from "../gateway/product.gateway";

class ProductRepository implements IProductGateway {
  constructor(
    private readonly databaseOperation: IDatabase<Product>
  ) { }
  async add(product: Product): Promise<void> {
    await this.databaseOperation.create(product);
  }

  async find(id: string): Promise<Product> {
    const product = await this.databaseOperation.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}

export { ProductRepository }
