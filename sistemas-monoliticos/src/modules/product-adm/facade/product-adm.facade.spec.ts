import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { Product } from "../domain/product.entity";

describe("ProductAdmFacade test", () => {
  it("should create a product", async () => {
    const productIdMock = new Id();
    const productAdmFacade = ProductAdmFacadeFactory.createMock();

    const input = {
      id: productIdMock.id,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    };

    await productAdmFacade.addproduct(input);

    const product = InMemoryDatabaseContext.inMemoryData.find(x => x.id.id === productIdMock.id)

    expect(product).toBeDefined();
    expect(product.id.id).toEqual(input.id);
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });

  it('should return product stock', async () => {
    const productIdMock = new Id();
    const productAdmFacade = ProductAdmFacadeFactory.createMock();

    const input = {
      productId: productIdMock.id,
    }

    const product = new Product({
      id: productIdMock,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    InMemoryDatabaseContext.inMemoryData.push(product);

    const result = await productAdmFacade.checkStock(input);
    expect(result).toStrictEqual({
      productId: productIdMock.id,
      stock: product.stock
    });
  });
});
