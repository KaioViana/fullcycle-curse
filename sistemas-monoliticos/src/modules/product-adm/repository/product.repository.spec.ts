import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";

describe("ProductRepository test", () => {
  it('test', () => expect(1).toBe(1));
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    }
    const productRepository = new ProductRepository();
    const product = new Product(productProps);
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: productProps.id.id,
      }
    });

    expect(productProps.id.id).toEqual(productDb.toJSON().id);
    expect(productProps.name).toEqual(productDb.toJSON().name);
    expect(productProps.description).toEqual(productDb.toJSON().description);
    expect(productProps.purchasePrice).toEqual(productDb.toJSON().purchasePrice);
    expect(productProps.stock).toEqual(productDb.toJSON().stock);
  });
});
