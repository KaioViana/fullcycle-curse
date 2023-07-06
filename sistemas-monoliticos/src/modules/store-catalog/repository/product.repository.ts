import { Product } from "../domain/product.entity";
import { IProductGateway } from "../gateway/product.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class ProductRepository implements IProductGateway {
  constructor(
    private readonly databaseOperation: IDatabaseContext<Product>
  ) { }

  async findAll(): Promise<Product[]> {
    return this.databaseOperation.findAll();

  }

  async find(id: string): Promise<Product> {
    return this.databaseOperation.findById(id);
  }
}

export { ProductRepository }
