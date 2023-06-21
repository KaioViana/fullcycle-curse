import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Transaction } from "../../domain/transaction"
import { ProcessPaymentUseCase } from "./process-payment.usecase"

const MockRepository = () => {
  return {
    save: jest.fn()
  }
}

describe('Process payment unit test', () => {
  it('should approve a transaction', async () => {
    const mockTransactionId = new Id();
    const mockTransaction = new Transaction({
      id: mockTransactionId,
      amount: 100,
      orderId: "1",
    });
    const repository = MockRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    repository.save.mockResolvedValue(mockTransaction);

    const input = {
      orderId: '1',
      amount: 100,
    }

    const result = await usecase.execute(input);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result.transactionId).toBe(mockTransaction.id.id);
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe('1');
  })
})
