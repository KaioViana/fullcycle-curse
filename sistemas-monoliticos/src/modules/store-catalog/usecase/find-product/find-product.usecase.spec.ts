import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindProductUseCase } from "./find-product.usecase";

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn(),
  }
}

describe('Find a product usecase unit test', () => {
  it('should find a product', async () => {
    const productIdMock = new Id();
    const product = new Product({
      id: productIdMock,
      name: 'Product 1',
      description: 'Description',
      salesPrice: 100,
    });
    const productRepository = MockRepository();

    productRepository.find.mockResolvedValue(product)

    const findProductUsecase = new FindProductUseCase(productRepository);

    const result = await findProductUsecase.execute({ id: productIdMock.id });

    expect(result).toStrictEqual({
      id: productIdMock.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    });
    expect(productRepository.find).toBeCalledTimes(1);
  })

});
