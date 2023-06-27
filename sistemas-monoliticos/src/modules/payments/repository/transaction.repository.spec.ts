import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { DatabaseConnection } from "../infra/database.connection";
import { TransactionRepository } from "./transaction.repository";

describe('Payment repository test', () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());

  it('should save a transaction', async () => {
    console.log('AQUI!!!');
    const repository = new TransactionRepository();
    const mockTransactionId = new Id();
    const transaction = new Transaction({
      id: mockTransactionId,
      amount: 100,
      orderId: '1',
    });

    transaction.approve();

    const result = await repository.save(transaction);

    expect(result.id).toBe(transaction.id.id);
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(transaction.amount);
    expect(result.orderId).toBe(transaction.orderId);
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });
});
