import { Sequelize } from "sequelize-typescript";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { TransactionModel } from "../infra/transaction.model";
import { PaymentFacade } from "./payment.facade";
import { FacadeFactory } from "../factory/facade.factory";

describe('Payment facade test', () => {
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
    const facade = FacadeFactory.create();
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
