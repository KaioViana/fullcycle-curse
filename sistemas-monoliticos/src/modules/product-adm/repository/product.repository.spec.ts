import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";

describe("ProductRepository test", () => {
  it("should create a product", async () => {
    const productIdMock = new Id();
    const productProps = {
      id: productIdMock,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    }
    const inMemory = new InMemoryDatabaseContext<Product>();
    const productRepository = new ProductRepository(inMemory);
    const product = new Product(productProps);
    await productRepository.add(product);

    const productDb = InMemoryDatabaseContext.inMemoryData.find(x => x.id.id === productIdMock.id);

    expect(productProps.id.id).toEqual(productDb.id.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.stock).toEqual(productDb.stock);
  });

  it("should find a product", async () => {
    const inMemory = new InMemoryDatabaseContext<Product>();
    const productRepository = new ProductRepository(inMemory);
    const productIdMock = new Id()
    const productMock = new Product({
      id: productIdMock,
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    InMemoryDatabaseContext.inMemoryData.push(productMock);

    const product = await productRepository.find(productIdMock.id);

    expect(product.id.id).toEqual(productIdMock.id);
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.purchasePrice).toEqual(100);
    expect(product.stock).toEqual(10);
  });
});
