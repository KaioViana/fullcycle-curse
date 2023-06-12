import { ProductModel } from "./infra/product.model";
import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { DatabaseConnection } from "./infra/database.connection";

describe("ProductRepository test", () => {
  beforeAll(async () => {
    await DatabaseConnection.sync();
  });

  afterAll(async () => {
    await DatabaseConnection.closeConnection();
  });

  it("should create a product", async () => {
    const productIdMock = new Id();
    const productProps = {
      id: productIdMock,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    }
    const productRepository = new ProductRepository();
    const product = new Product(productProps);
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: productProps.id.id,
      }
    });

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.stock).toEqual(productDb.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productIdMock = new Id()
    await ProductModel.create({
      id: productIdMock.id,
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await productRepository.find(productIdMock.id);

    expect(product.id.id).toEqual(productIdMock.id);
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.purchasePrice).toEqual(100);
    expect(product.stock).toEqual(10);
  });
});
