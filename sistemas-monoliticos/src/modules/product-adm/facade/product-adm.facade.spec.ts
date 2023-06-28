import { ProductModel } from "../infra/product.model";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { Sequelize } from "sequelize-typescript";

describe("ProductAdmFacade test", () => {
  let databaseInstance: Sequelize;

  beforeEach(async () => {
    databaseInstance = DatabaseConnection.getConnectionInstance(':memory_product');
    databaseInstance.addModels([ProductModel]);
    ProductModel.initModel(databaseInstance);
    await databaseInstance.sync();
  });

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

  it("should create a product", async () => {
    const productIdMock = new Id();
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: productIdMock.id,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    };

    await productAdmFacade.addproduct(input);

    const product = await ProductModel.findOne({
      where: { id: productIdMock.id }
    });

    expect(product).toBeDefined();
    expect(product.id).toEqual(input.id);
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });

  it('should return product stock', async () => {
    const productIdMock = new Id();
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      productId: productIdMock.id,
    }

    const product = {
      id: productIdMock.id,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ProductModel.create(product);

    const result = await productAdmFacade.checkStock(input);
    expect(result).toStrictEqual({
      productId: productIdMock.id,
      stock: product.stock
    });
  });
});
