import { FacadeFactory } from "../factory/facade.factory";

describe('Payment facade test', () => {
  it('should save a transaction', async () => {
    const facade = FacadeFactory.createMock();
    const input = {
      orderId: '1',
      amount: 100,
    }

    const result = await facade.processPayment(input);

    expect(result.status).toBe('approved');
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe('1');
  });
});
