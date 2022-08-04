import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/entity/product";
import { setupMemoryDatabase } from "../../../__tests__/utils/setup";
import ProductModel from "../../db/sequelize/model/product.model";
import { ProductRepositorySequelize } from "./product.repository.sequelize";

class MockProductRepository extends ProductRepositorySequelize { }

describe("Product Sequelize repository", () => {
  setupMemoryDatabase();

  it("should create a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product("1", "product1", 100);

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "product1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200
    });
  });

  it("should find a product", async () => {
    const productRepository = new MockProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const foundProduct = await productRepository.find('1');

    expect(foundProduct).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100
    });
  });

  it("shuld find all products", async () => {
    const productRepository = new MockProductRepository();
    const products = [new Product('1', 'Product 1', 100), new Product('2', 'Product 2', 200)]

    products.forEach(async (product) => productRepository.create(product));

    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toHaveLength(2);
    expect(products).toEqual(foundProducts);
  });
});
