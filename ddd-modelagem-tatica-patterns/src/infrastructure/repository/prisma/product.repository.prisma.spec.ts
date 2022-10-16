import Product from "../../../domain/product/entity/product";
import { setupPrismaDatabase } from "../../../__tests__/utils/setup";
import { prismaClient } from "../../db/prisma/client/prismaClient";
import { ProductRepositoryPrisma } from "./product.repository.prisma";

class MockProductRepository extends ProductRepositoryPrisma { }

describe("Product Prisma repository", () => {
  setupPrismaDatabase();
  it("should create a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product("1", "product1", 100);

    await productRepository.create(product);

    const productFound = await prismaClient.product.findUnique({ where: { id: "1" } })

    expect(productFound).toStrictEqual({
      id: "1",
      name: "product1",
      price: 100
    });
  });

  it("should find a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productFound = await productRepository.find("1");

    expect(productFound).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productFound = await productRepository.find("1");

    expect(productFound).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200
    });
  });

  it("should find all products", async () => {
    const productRepository = new MockProductRepository();
    const products = [new Product('1', 'Product 1', 100), new Product('2', 'Product 2', 200)]

    await Promise.all(products.map(async (product) => productRepository.create(product)));

    const productsFound = await productRepository.findAll();

    expect(productsFound).toHaveLength(2);
    expect(products).toEqual(productsFound);
  })
});
