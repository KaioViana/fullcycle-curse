import { Transaction } from "../domain/transaction";
import { IPaymentGateway } from "../gateway/payment.gateway";
import { IDatabaseOperation } from "../infra/database/sequelize/database.operation.interface";

class TransactionRepository implements IPaymentGateway {
  constructor(
    private readonly databaseOperation: IDatabaseOperation<Transaction>
  ) { }
  async save(input: Transaction): Promise<Transaction> {
    await this.databaseOperation.create(input);
    return input;
  }
}

export { TransactionRepository }
