import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { DatabaseConnection } from "../infra/database.connection"
import { ProductModel } from "../infra/product.model";

describe("ProductRepository test", () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());

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
});
