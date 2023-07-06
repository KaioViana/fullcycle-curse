import { Transaction } from "../domain/transaction";
import { IPaymentGateway } from "../gateway/payment.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class TransactionRepository implements IPaymentGateway {
  constructor(
    private readonly databaseOperation: IDatabaseContext<Transaction>
  ) { }
  async save(input: Transaction): Promise<Transaction> {
    await this.databaseOperation.create(input);
    return input;
  }
}

export { TransactionRepository }
