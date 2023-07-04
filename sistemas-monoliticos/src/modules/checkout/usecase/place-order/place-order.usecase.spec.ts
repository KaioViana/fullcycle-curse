import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { FindStoreCatalogFacadeOutputDto } from "../../../store-catalog/facade/store-catalog.facade.dto";
import { ProductEntity } from "../../domain/product.entity";
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
const MockCatalogFacade = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn(),
  }
};

describe('Place order usecase unit test', () => {
  let placeOrderUsecase: PlaceOrderUseCase;
  let validateProductsStub: jest.SpyInstance;

  const mockClientFacade = MockClientFacade();
  const mockProductFacade = MockProductFacade();
  const mockCatalogFacade = MockCatalogFacade();

  beforeAll(() => {
    placeOrderUsecase = new PlaceOrderUseCase(
      mockClientFacade,
      mockProductFacade,
      mockCatalogFacade,
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

  describe('getProducts method', () => {
    let mockDate: Date;

    beforeAll(() => {
      mockDate = new Date(2000, 1, 1);
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterAll(() => jest.useRealTimers());

    it('should throw an error when product not found', async () => {
      mockCatalogFacade.find.mockResolvedValue(null);

      await expect(placeOrderUsecase['getProduct']('0'))
        .rejects
        .toThrowError('Product not found.');
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });

    it('should return a product', async () => {
      const mockProductId = new Id();
      const mockProduct: FindStoreCatalogFacadeOutputDto = {
        id: mockProductId.id,
        name: 'product 1',
        description: 'description',
        salesPrice: 100,
      };
      mockCatalogFacade.find.mockResolvedValue(mockProduct);

      const result = await placeOrderUsecase['getProduct'](mockProductId.id);

      expect(result.id.id).toBe(mockProduct.id);
      expect(result.name).toBe(mockProduct.name);
      expect(result.description).toBe(mockProduct.description);
      expect(result.salesPrice).toBe(mockProduct.salesPrice);
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
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
