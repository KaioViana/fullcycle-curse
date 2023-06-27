import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { TransactionModel } from "../infra/transaction.model";
import { DatabaseConnection } from "../infra/database.connection";
import { TransactionRepository } from "./transaction.repository";

describe('Payment repository test', () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());

  it('should save a transaction', async () => {
    const repository = new TransactionRepository();
    const mockTransactionId = new Id();
    const transaction = new Transaction({
      id: mockTransactionId,
      amount: 100,
      orderId: '1',
    });
    TransactionModel.findAll();

    transaction.approve();


    const result = await repository.save(transaction);

    expect(result.id.id).toBe(transaction.id.id);
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(transaction.amount);
    expect(result.orderId).toBe(transaction.orderId);
  });
});
