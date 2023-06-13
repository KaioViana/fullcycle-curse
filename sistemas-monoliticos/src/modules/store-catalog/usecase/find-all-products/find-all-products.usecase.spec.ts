import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product, ProductProps } from "../../domain/product.entity"
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

const generateProducts = (values: ProductProps[]) => {
  return values.map(item => new Product(item));
}

describe("FindAllProducts usecase unit test", () => {
  const productIdMock1 = new Id();
  const productIdMock2 = new Id();
  it('should find all products', async () => {
    const products = generateProducts([
      {
        id: productIdMock1,
        name: 'Product1',
        description: 'Description',
        salesPrice: 100,
      },
      {
        id: productIdMock2,
        name: 'Product2',
        description: 'Description',
        salesPrice: 200,
      },
    ]);

    const mockRepository = MockRepository();
    const findAllProductsUsecase = new FindAllProductsUseCase(mockRepository);
    mockRepository.findAll.mockResolvedValue(products);
    const result = await findAllProductsUsecase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result.products).toHaveLength(2);
    expect(result).toStrictEqual({
      products: [
        {
          id: products[0].id.id,
          name: products[0].name,
          description: products[0].description,
          salesPrice: products[0].salesPrice,
        },
        {
          id: products[1].id.id,
          name: products[1].name,
          description: products[1].description,
          salesPrice: products[1].salesPrice,
        }
      ]
    });
  });
});
