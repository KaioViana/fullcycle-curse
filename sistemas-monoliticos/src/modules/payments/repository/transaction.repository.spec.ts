import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { TransactionRepository } from "./transaction.repository";
import { DatabaseOperation } from '../../../__tests__/database/in-memory/database.operation';

describe('Payment repository test', () => {
  it('should save a transaction', async () => {
    const inMemory = new DatabaseOperation<Transaction>();
    const repository = new TransactionRepository(inMemory);
    const mockTransactionId = new Id();
    const transaction = new Transaction({
      id: mockTransactionId,
      amount: 100,
      orderId: '1',
    });

    transaction.approve();

    const result = await repository.save(transaction);

    expect(result.id.id).toBe(transaction.id.id);
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(transaction.amount);
    expect(result.orderId).toBe(transaction.orderId);
  });
});
