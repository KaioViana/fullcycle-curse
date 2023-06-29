import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { TransactionModel } from "../infra/transaction.model";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { TransactionRepository } from "./transaction.repository";
import { Sequelize } from "sequelize-typescript";

describe('Payment repository test', () => {
  let databaseInstance: Sequelize;

  beforeEach(async () => {
    databaseInstance = DatabaseConnection.getConnectionInstance(':memory_payments');
    databaseInstance.addModels([TransactionModel]);
    TransactionModel.initModel(databaseInstance);
    await databaseInstance.sync();
  });

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

  it('should save a transaction', async () => {
    const repository = new TransactionRepository();
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
