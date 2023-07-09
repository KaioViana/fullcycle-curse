import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../../domain/product.entity";
import { IDatabaseContext } from "../database.context.interface";
import { ProductModel } from "./product.model";

class DatabaseContext implements IDatabaseContext<Product> {
  async create(input: Product): Promise<void> {
    await ProductModel.create({
      id: input.id.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findOne({
      where: {
        id
      }
    });

    if (product) {
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    }
    return null;
  }
}

export { DatabaseContext };
