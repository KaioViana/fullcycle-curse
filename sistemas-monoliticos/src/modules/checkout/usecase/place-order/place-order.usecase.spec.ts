import { PlaceOrderInputDto } from "./place-order.dto";
import { PlaceOrderUseCase } from "./place-order.usecase";

const MockClientFacade = () => {
  return {
    find: jest.fn(),
    add: jest.fn()
  }
}
const MockProductFacade = () => {
  return {
    checkStock: jest.fn(),
    addproduct: jest.fn(),
  }
}

describe('Place order usecase unit test', () => {
  let placeOrderUsecase: PlaceOrderUseCase;
  let validateProductsStub: jest.SpyInstance;

  const mockClientFacade = MockClientFacade();
  const mockProductFacade = MockProductFacade();

  beforeAll(() => {
    placeOrderUsecase = new PlaceOrderUseCase(
      mockClientFacade,
      mockProductFacade,
    );
    validateProductsStub = jest.spyOn(placeOrderUsecase as any, 'validateProducts');
  });

  describe('validateProducts method', () => {
    it('should throw error if no products are selected', async () => {
      const input: PlaceOrderInputDto['products'] = [];

      await expect(placeOrderUsecase['validateProducts'](input))
        .rejects
        .toThrowError('No products selected.');
    });

    it('should throw an error when product is out of stock', async () => {
      let input: PlaceOrderInputDto['products'] = [
        { productId: '1' },
      ];

      mockProductFacade.checkStock.mockResolvedValue({
        productId: '1',
        stock: 0
      });

      await expect(placeOrderUsecase['validateProducts'](input))
        .rejects
        .toThrowError('Product 1 is not available in stock.');

      input = [
        { productId: '2' },
        { productId: '3' }
      ];

      mockProductFacade.checkStock.mockResolvedValue({
        productId: '2',
        stock: 0
      });

      await expect(placeOrderUsecase['validateProducts'](input))
        .rejects
        .toThrowError('Product 2 is not available in stock.');
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);

    });
  });

  describe('Execute method', () => {
    it('should throw an error when client not found', async () => {
      mockClientFacade.find.mockResolvedValue(null);
      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: [],
      }
      await expect(placeOrderUsecase.execute(input)).rejects.toThrowError('Client not found.');
    });

    it('should throw an error when products are not valid', async () => {
      mockClientFacade.find.mockResolvedValue(true);

      const input: PlaceOrderInputDto = {
        clientId: '1',
        products: []
      };

      await expect(placeOrderUsecase.execute(input))
        .rejects
        .toThrowError('No products selected.');
      expect(validateProductsStub).toHaveBeenCalledTimes(1);
    });
  });
});
