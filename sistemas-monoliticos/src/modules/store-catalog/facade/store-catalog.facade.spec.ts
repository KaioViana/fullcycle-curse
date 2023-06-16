import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { DatabaseConnection } from "../infra/database.connection";
import { ProductModel } from "../infra/product.model";

describe('Store catalod facade test', () => {
  beforeAll(async () => DatabaseConnection.sync())
  afterAll(async () => DatabaseConnection.closeConnection())

  it('should find all products', async () => {
    const storeCatalogFacade = FacadeFactory.create();
    await ProductModel.create({
      id: new Id().id,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });

    await ProductModel.create({
      id: new Id().id,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });

    const result = await storeCatalogFacade.findAll();

    expect(result.products).toHaveLength(2);
  });

  it('should find a product', async () => {
    const productIdMock = new Id();
    const storeCatalogFacade = FacadeFactory.create();
    await ProductModel.create({
      id: productIdMock.id,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });

    const product = await storeCatalogFacade.find({ id: productIdMock.id });

    expect(product).toBeDefined();
  });

});
