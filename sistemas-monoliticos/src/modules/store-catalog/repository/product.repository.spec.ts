import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";
import { Product } from "../domain/product.entity";

describe("ProductRepository test", () => {
  it('should find all products', async () => {
    const product1 = new Product({
      id: new Id(),
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });
    const product2 = new Product({
      id: new Id(),
      name: 'Product 2',
      description: 'Description',
      salesPrice: 100,
    });
    const inMemory = new InMemoryDatabaseContext<Product>
    const productRepository = new ProductRepository(inMemory);

    InMemoryDatabaseContext.inMemoryData.push(product1);
    InMemoryDatabaseContext.inMemoryData.push(product2);

    const result = await productRepository.findAll();

    expect(result).toHaveLength(2);
  });

  it('should find a product', async () => {
    const productIdMock = new Id();
    const productMock = new Product({
      id: productIdMock,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });
    const inMemory = new InMemoryDatabaseContext<Product>;
    const productRepository = new ProductRepository(inMemory);

    InMemoryDatabaseContext.inMemoryData.push(productMock);

    const product = await productRepository.find(productIdMock.id);

    expect(product.id.id).toBe(productMock.id.id);
  });
});
