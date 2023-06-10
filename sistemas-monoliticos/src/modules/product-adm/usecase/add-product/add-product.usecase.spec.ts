import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product1",
      description: "description",
      purchasePrice: 100,
      stock: 10,
    };

    const result = await usecase.execute(input);
    expect(productRepository.add).toHaveBeenCalledTimes(1);
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.purchasePrice).toBeDefined();
    expect(result.stock).toBeDefined();
  });
});
