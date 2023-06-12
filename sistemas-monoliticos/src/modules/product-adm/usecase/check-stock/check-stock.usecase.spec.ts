import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { CheckStockUseCase } from "./check-stock.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Check stock usecase unit test", () => {

  it('should throw an erro if product not found', async () => {
    const mockRepository = MockRepository();
    const checkStockUsecase = new CheckStockUseCase(mockRepository);
    expect(checkStockUsecase.execute({ productId: "1" })).rejects.toThrowError('Product not found');
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should reuturn a product stock', async () => {
    const productIdMock = new Id();
    const mockProduct = new Product({
      id: productIdMock,
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const mockRepository = MockRepository();
    const checkStockUsecase = new CheckStockUseCase(mockRepository);
    mockRepository.find.mockResolvedValue(mockProduct);
    const result = await checkStockUsecase.execute({ productId: productIdMock.id });

    expect(result).toStrictEqual({
      productId: mockProduct.id.id,
      stock: mockProduct.stock,
    });
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  })
})
