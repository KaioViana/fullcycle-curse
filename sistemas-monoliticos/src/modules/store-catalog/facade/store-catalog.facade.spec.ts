import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { ProductModel } from "../infra/product.model";
import { Sequelize } from "sequelize-typescript";

describe('Store catalod facade test', () => {
  let databaseInstance: Sequelize;

  beforeEach(async () => {
    databaseInstance = DatabaseConnection.getConnectionInstance();
    databaseInstance.addModels([ProductModel]);
    ProductModel.initModel(databaseInstance);
    await databaseInstance.sync();
  });

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

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
