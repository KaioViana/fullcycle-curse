import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { IDatabaseContext } from "../database.context.interface";
import { Product } from "../../../domain/product.entity";
import { ProductModel } from "./product.model";

class DatabaseContext implements IDatabaseContext<Product> {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(item => new Product({
      id: new Id(item.id),
      name: item.name,
      description: item.description,
      salesPrice: item.salesPrice,
    }));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findOne({
      where: {
        id,
      }
    });

    if (product) {
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      });
    }
  }
}

export { DatabaseContext };
