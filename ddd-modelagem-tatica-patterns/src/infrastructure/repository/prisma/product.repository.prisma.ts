import Product from "../../../domain/entity/product";
import ProductRepositoryInterface from "../../../domain/repository/product-repository.interface";
import { prismaClient } from '../../db/prisma/client/prismaClient';

class ProductRepositoryPrisma implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await prismaClient.product.create({
      data: {
        id: entity.id,
        name: entity.name,
        price: entity.price
      }
    })
  }

  async find(id: string): Promise<Product> {
    const product = await prismaClient.product.findUnique({ where: { id } })

    return product as Product;
  }

  async findAll(): Promise<Product[]> {
    const products = await prismaClient.product.findMany();
    return products.map((product: any) =>
      new Product(product.id, product.name, product.price)
    )
  }

  async update(entity: Product): Promise<void> {
    await prismaClient.product.update({
      where: {
        id: entity.id
      },
      data: {
        name: entity.name,
        price: entity.price
      }
    });
  }
}

export { ProductRepositoryPrisma }
