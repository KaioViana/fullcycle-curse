import Product from "../../domain/entity/product";
import { setupInMemorySequelize, setupPrismaDatabase } from "../../__tests__/utils/setup";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  setupInMemorySequelize();
  setupPrismaDatabase();

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product1", 100);

    await productRepository.create(product);

    const productFound = await productRepository.find("1");

    expect(productFound).toStrictEqual({
      id: "1",
      name: "product1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productFound = await productRepository.find('1');

    expect(productFound).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product1", 100);

    await productRepository.create(product);

    const foundProduct = await productRepository.find('1');

    expect(foundProduct).toStrictEqual({
      id: "1",
      name: "product1",
      price: 100
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product1", 100);
    const product2 = new Product("2", "product2", 200);

    await productRepository.create(product);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(foundProducts).toHaveLength(2);
    expect(products).toEqual(foundProducts);
  });
});