import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id }
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return new Product({
      id: new Id(product.toJSON().id),
      name: product.toJSON().name,
      description: product.toJSON().description,
      purchasePrice: product.toJSON().purchasePrice,
      stock: product.toJSON().stock,
      createdAt: product.toJSON().createdAt,
      updatedAt: product.toJSON().updatedAt,
    });
  }
}

export { ProductRepository }
