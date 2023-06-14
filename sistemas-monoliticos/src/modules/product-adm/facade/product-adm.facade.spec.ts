import { ProductModel } from "../infra/product.model";
import { DatabaseConnection } from "../infra/database.connection";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
  beforeAll(async () => {
    await DatabaseConnection.sync();
  });

  afterAll(async () => await DatabaseConnection.closeConnection());

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
