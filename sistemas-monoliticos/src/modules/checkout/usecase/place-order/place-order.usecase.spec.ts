import { PlaceOrderInputDto } from "./place-order.dto";
import { PlaceOrderUseCase } from "./place-order.usecase";

const MockClientFacade = () => {
  return {
    find: jest.fn(),
    add: jest.fn()
  }
}
describe('Place order usecase unit test', () => {
  let placeOrderUsecase: PlaceOrderUseCase;

  const mockClientFacade = MockClientFacade();

  beforeAll(() => {
    placeOrderUsecase = new PlaceOrderUseCase(
      mockClientFacade
    );
  });
  describe('Execute method', () => {
    let validateProductsStub: jest.SpyInstance;

    beforeAll(() => {
      validateProductsStub = jest.spyOn(placeOrderUsecase as any, 'validateProducts');
    })
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

      await expect(placeOrderUsecase.execute(input)).rejects.toThrowError('No products selected.');
      expect(validateProductsStub).toHaveBeenCalledTimes(1);
    });
  });
});
