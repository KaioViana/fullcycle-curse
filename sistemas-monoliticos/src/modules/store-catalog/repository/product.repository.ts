import { Product } from "../domain/product.entity";
import { IProductGateway } from "../gateway/product.gateway";
import { IDatabaseOperation } from "../infra/database/sequelize/database.operation.interface";

class ProductRepository implements IProductGateway {
  constructor(
    private readonly databaseOperation: IDatabaseOperation<Product>
  ) { }

  async findAll(): Promise<Product[]> {
    return this.databaseOperation.findAll();

  }

  async find(id: string): Promise<Product> {
    return this.databaseOperation.findById(id);
  }
}

export { ProductRepository }
