import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";
import { Product } from "../domain/product.entity";

describe('Store catalod facade test', () => {
  it('should find all products', async () => {
    const storeCatalogFacade = FacadeFactory.createMock();
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

    InMemoryDatabaseContext.inMemoryData.push(product1);
    InMemoryDatabaseContext.inMemoryData.push(product2);

    const result = await storeCatalogFacade.findAll();

    expect(result.products).toHaveLength(2);
  });

  it('should find a product', async () => {
    const productIdMock = new Id();
    const storeCatalogFacade = FacadeFactory.createMock();
    const productMock = new Product({
      id: productIdMock,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });

    InMemoryDatabaseContext.inMemoryData.push(productMock);

    const product = await storeCatalogFacade.find({ id: productIdMock.id });

    expect(product.id).toBe(productIdMock.id);
  });
});
