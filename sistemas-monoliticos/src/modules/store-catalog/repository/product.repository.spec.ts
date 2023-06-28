import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { DatabaseConnection } from "../../../__tests__/database.connection"
import { ProductModel } from "../infra/product.model";
import { Sequelize } from "sequelize-typescript";

describe("ProductRepository test", () => {
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
    const productRepository = new ProductRepository();
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

    const result = await productRepository.findAll();

    expect(result).toHaveLength(2);
  });

  it('should find a product', async () => {
    const productIdMock = new Id();
    const productRepository = new ProductRepository();
    await ProductModel.create({
      id: productIdMock.id,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });

    const product = await productRepository.find(productIdMock.id);

    expect(product).toBeDefined();
  });
});
