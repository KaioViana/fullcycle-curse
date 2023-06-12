import { ProductModel } from "../repository/infra/product.model";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { ProductAdmFacade } from "./product-adm.facade";
import { IUseCase } from "../../@shared/usecase/use-case.interface";
import { DatabaseConnection } from "../repository/infra/database.connection";
import { Id } from "../../@shared/domain/value-object/id.value-object";

describe("ProductAdmFacade test", () => {
  beforeAll(async () => {
    await DatabaseConnection.sync();
  });


  afterAll(async () => await DatabaseConnection.closeConnection());

  it("should create a product", async () => {
    const productIdMock = new Id();
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);

    const productadmFacade = new ProductAdmFacade(
      addProductUseCase,
      {} as IUseCase
    );

    const input = {
      id: productIdMock.id,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    };

    await productadmFacade.addproduct(input);

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
})
