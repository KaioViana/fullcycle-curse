import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { IProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "../infra/product.model";

class ProductRepository implements IProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(item =>
      new Product({
        id: new Id(item.id),
        name: item.name,
        description: item.description,
        salesPrice: item.salesPrice,
      }),
    );
  }

  async find(id: string): Promise<Product> {
    return {} as Product
  }
}

export { ProductRepository }
