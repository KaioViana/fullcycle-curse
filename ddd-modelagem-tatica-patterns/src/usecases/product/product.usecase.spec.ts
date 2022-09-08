import Product from "../../domain/entity/product"
import { prismaClient } from "../../infrastructure/db/prisma/client/prismaClient"
import ProductModel from "../../infrastructure/db/sequelize/model/product.model"
import { ProductRepositoryPrisma } from "../../infrastructure/repository/prisma/product.repository.prisma"
import { ProductRepositorySequelize } from "../../infrastructure/repository/sequelize/product.repository.sequelize"
import { setupInMemorySequelize, setupPrismaDatabase } from "../../__tests__/utils/setup"
import { ProductUseCase } from "./product.usecase"

describe("Product use case", () => {
  setupInMemorySequelize()
  setupPrismaDatabase();

  it('should execute with prisma repository', async () => {
    const productRepositoryPrisma = new ProductRepositoryPrisma();
    const productUseCase = new ProductUseCase(productRepositoryPrisma);
    const product = new Product('1', 'product 1', 100);

    const result = await productUseCase.execute(product);

    const productFound = await prismaClient.product.findUnique({ where: { id: '1' } })

    expect(productFound).toStrictEqual({
      id: '1',
      name: result.name,
      price: result.price
    });
  });

  it('should execute with sequelize repository', async () => {
    const productRepositorySequelize = new ProductRepositorySequelize();
    const productUseCase = new ProductUseCase(productRepositorySequelize);
    const product = new Product('1', 'product 1', 100);

    const result = await productUseCase.execute(product);

    const productFound = await ProductModel.findOne({ where: { id: '1' } })

    expect(productFound.toJSON()).toStrictEqual({
      id: '1',
      name: result.name,
      price: result.price
    });
  });
});
