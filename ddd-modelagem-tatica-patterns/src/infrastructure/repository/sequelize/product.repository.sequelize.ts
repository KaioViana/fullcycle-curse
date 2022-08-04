import Product from "../../../domain/entity/product";
import ProductRepositoryInterface from "../../../domain/repository/product-repository.interface";
import ProductModel from "../../db/sequelize/model/product.model";

abstract class ProductRepositorySequelize implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    return product.toJSON();
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(product =>
      new Product(product.id, product.name, product.price)
    )
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: {
        id: entity.id
      }
    });
  }
}

export { ProductRepositorySequelize }
